use std::fs;
use std::path::Path;

fn main() {
    // Create icons directory
    fs::create_dir_all("icons").ok();
    
    let icon_path = "icons/icon.ico";
    
    // Create a minimal valid 256-byte ICO file (1x1 pixel, 32-bit RGBA)
    if !Path::new(icon_path).exists() {
        let ico_data: &[u8] = &[
            // ICO header
            0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
            // Image dimensions (1x1)
            0x01, 0x01,
            // Color planes and bits per pixel
            0x00, 0x01, 0x20, 0x00,
            // Size of image data
            0x30, 0x00, 0x00, 0x00,
            // Offset of image data
            0x16, 0x00, 0x00, 0x00,
            // BITMAPINFOHEADER
            0x28, 0x00, 0x00, 0x00,
            // Width (1 pixel)
            0x01, 0x00, 0x00, 0x00,
            // Height (1 pixel, doubled for AND mask)
            0x02, 0x00, 0x00, 0x00,
            // Planes
            0x01, 0x00,
            // Bits per pixel (32-bit RGBA)
            0x20, 0x00,
            // Compression (none)
            0x00, 0x00, 0x00, 0x00,
            // Image size
            0x00, 0x00, 0x00, 0x00,
            // Horizontal resolution
            0x00, 0x00, 0x00, 0x00,
            // Vertical resolution
            0x00, 0x00, 0x00, 0x00,
            // Colors used
            0x00, 0x00, 0x00, 0x00,
            // Important colors
            0x00, 0x00, 0x00, 0x00,
            // Image data (1 pixel, BGRA format: white with full alpha)
            0xFF, 0xFF, 0xFF, 0xFF,
            // AND mask (1 byte, all zeros for fully opaque)
            0x00,
            // Padding to align
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        ];
        
        fs::write(icon_path, ico_data).expect("Failed to write icon file");
    }
    
    tauri_build::build()
}
