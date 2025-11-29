export const getDownloadUrl = (url: string): string => {
    try {
        // Check if it's a Google Drive URL
        if (url.includes("drive.google.com")) {
            // Extract file ID
            // Matches /file/d/{fileId}/view or /open?id={fileId}
            const fileIdMatch =
                url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);

            if (fileIdMatch && fileIdMatch[1]) {
                return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
            }
        }
        // Return original URL if not a drive link or ID not found
        return url;
    } catch (error) {
        console.error("Error converting drive URL:", error);
        return url;
    }
};
