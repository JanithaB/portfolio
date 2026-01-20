# Supabase Storage Setup for Blog Images

Follow these steps to set up image storage for your blog.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Enter bucket details:
   - **Name:** `blog-images`
   - **Public bucket:** ✅ Check this (images need to be publicly accessible)
   - **File size limit:** 5MB (adjust as needed)
   - **Allowed MIME types:** Leave empty or specify: `image/jpeg, image/png, image/gif, image/webp`
5. Click **"Create bucket"**

## Step 2: Set Up Storage Policies

The bucket needs policies to allow:
- **Public read access** (anyone can view images)
- **Authenticated write access** (only your service role can upload)

### Option A: Use Supabase Dashboard

1. Go to **Storage** → Click on `blog-images` bucket
2. Click **"Policies"** tab
3. Click **"New Policy"**

**Policy 1: Public Read Access**
- Policy name: `Public read access`
- Allowed operations: `SELECT`
- Target roles: `public`
- Policy definition:
```sql
true
```

**Policy 2: Service Role Upload**
- Policy name: `Service role can upload`
- Allowed operations: `INSERT`
- Target roles: `service_role`
- Policy definition:
```sql
true
```

### Option B: Use SQL Editor

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public to read images from blog-images bucket
CREATE POLICY "Public can read blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Allow service role to upload images to blog-images bucket
CREATE POLICY "Service role can upload blog images"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'blog-images');

-- Allow service role to update images in blog-images bucket
CREATE POLICY "Service role can update blog images"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'blog-images');

-- Allow service role to delete images from blog-images bucket
CREATE POLICY "Service role can delete blog images"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'blog-images');
```

## Step 3: Update Database Schema

Run this SQL to add the cover_image column (already in your schema.sql):

```sql
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;
```

Or simply run the full `supabase/schema.sql` file again.

## Step 4: Verify Setup

1. Go to **Storage** → `blog-images`
2. Try uploading a test image manually
3. Check if the image URL is publicly accessible
4. The URL format should be:
   ```
   https://[your-project].supabase.co/storage/v1/object/public/blog-images/[filename]
   ```

## Step 5: Test Image Upload

1. Restart your development server
2. Go to `/admin/blog/new`
3. Log in with your admin password
4. Try pasting an image (Ctrl+V) into the content editor
5. The image should upload and markdown syntax should appear: `![image](url)`

## Troubleshooting

### "Failed to upload image"
- Check that the bucket name is exactly `blog-images`
- Verify the bucket is set to **public**
- Check that storage policies are correctly set up

### "Image URL not accessible"
- Make sure the bucket is **public**
- Check the URL format is correct
- Verify RLS policies allow public SELECT

### "Upload taking too long"
- Large images may take time to upload
- Consider resizing images before upload (can add client-side compression)
- Check your internet connection

## Optional: Image Optimization

Consider adding these enhancements:

### 1. Client-Side Image Compression
Install a library like `browser-image-compression`:
```bash
npm install browser-image-compression
```

### 2. Automatic Thumbnails
Supabase can generate image transformations on-the-fly:
```
https://[project].supabase.co/storage/v1/render/image/public/blog-images/image.jpg?width=800&quality=80
```

### 3. File Size Limits
In the upload API, add validation:
```typescript
if (buffer.length > 5 * 1024 * 1024) { // 5MB
  return NextResponse.json({ error: 'File too large' }, { status: 400 });
}
```

## Image Usage in Blog Posts

Once uploaded, images are automatically inserted as markdown:

```markdown
![image](https://your-project.supabase.co/storage/v1/object/public/blog-images/123456-myimage.jpg)
```

You can customize the alt text:
```markdown
![My awesome screenshot](url)
```

And ReactMarkdown will render them automatically with your Tailwind styles!

---

**Status:** ✅ Storage bucket setup required before image uploads will work
