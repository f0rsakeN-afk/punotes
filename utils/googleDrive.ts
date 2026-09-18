const FILE_ID_REGEX = /\/file\/d\/([^/]+)/;
const ID_PARAM_REGEX = /[?&]id=([^&]+)/;

export const getFileId = (url: string): string | null => {
    const match = url.match(FILE_ID_REGEX) || url.match(ID_PARAM_REGEX);
    return match?.[1] ?? null;
};

export const getPreviewUrl = (url: string): string => {
    try {
        if (url.includes("drive.google.com")) {
            const fileIdMatch = url.match(FILE_ID_REGEX) || url.match(ID_PARAM_REGEX);
            if (fileIdMatch && fileIdMatch[1]) {
                return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
            }
        }
        return url;
    } catch {
        return url;
    }
};

export const getDownloadUrl = (url: string): string => {
    try {
        if (url.includes("drive.google.com")) {
            const fileIdMatch = url.match(FILE_ID_REGEX) || url.match(ID_PARAM_REGEX);

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
