using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Utilities
{
    public class ImageHelper
    {
        public Bitmap ResizeImage(Image image, int size) // Synchoronous
        {
            if (image.Size.Width <= size && image.Size.Height <= size)
                return new Bitmap(image);

            var ratio = (float)Math.Min(image.Size.Width, image.Size.Height) / (float)Math.Max(image.Size.Width, image.Size.Height);
            var width = image.Size.Width >= image.Size.Height ? size : size * ratio;
            var height = image.Size.Height >= image.Size.Width ? size : size * ratio;

            using var bitmap = new Bitmap(image);
            Bitmap thumbBitmap = new Bitmap((int)width, (int)height);

            using Graphics g = Graphics.FromImage(thumbBitmap);
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.DrawImage(bitmap, 0, 0, width, height);
            return thumbBitmap;
        }

        public MemoryStream ResizeImage(Stream stream, int size)
        {
            var memStream = new MemoryStream();
            Image image = Image.FromStream(stream);

            image = ResizeImage(image, size);
            image.Save(memStream, ImageFormat.Jpeg);
            image.Dispose();

            memStream.Position = 0;
            return memStream;
        }

        public Bitmap ResizeImage(byte[] binary, int size)
        {
            using var memStream = new MemoryStream(binary);
            Image image = Image.FromStream(memStream);
            return ResizeImage(image, size);
        }

        public string ConvertToBase64(byte[] binary)
        {
            var base64Data = Convert.ToBase64String(binary);
            return $"data:image/jpg;base64,{base64Data}";
        }

        public string ConvertToBase64(Bitmap bitmap)
        {
            using var memStream = new MemoryStream();
            bitmap.Save(memStream, ImageFormat.Jpeg);
            memStream.Position = 0;
            return ConvertToBase64(memStream.ToArray());
        }
    }
}
