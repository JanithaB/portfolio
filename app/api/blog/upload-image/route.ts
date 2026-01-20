import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const { password, image, filename } = await request.json();

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-secret-password';
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!image || !filename) {
      return NextResponse.json(
        { error: 'Image and filename are required' },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Compress and optimize image using sharp
    const compressedBuffer = await sharp(buffer)
      .resize(1200, null, { 
        withoutEnlargement: true, // Don't upscale smaller images
        fit: 'inside' // Maintain aspect ratio
      })
      .webp({ 
        quality: 80, // Good balance between quality and file size
        effort: 4 // Compression effort (0-6, higher = better compression but slower)
      })
      .toBuffer();

    // Generate unique filename with .webp extension
    const timestamp = Date.now();
    const baseFilename = filename.replace(/\.[^.]+$/, ''); // Remove original extension
    const uniqueFilename = `${timestamp}-${baseFilename}.webp`;

    // Upload compressed image to Supabase Storage
    const { error } = await supabase.storage
      .from('blog-images')
      .upload(uniqueFilename, compressedBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(uniqueFilename);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      filename: uniqueFilename,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
