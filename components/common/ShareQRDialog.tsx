"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Link2, Check, Share2, MessageCircle, Facebook, Twitter, Mail } from "lucide-react";

interface ShareQRDialogProps {
  url: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareQRDialog({ url, title, open, onOpenChange }: ShareQRDialogProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socials = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-600 hover:bg-green-50",
      href: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600 hover:bg-blue-50",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "text-sky-500 hover:bg-sky-50",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-gray-600 hover:bg-gray-50",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      ctx?.drawImage(img, 0, 0, 300, 300);
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${title.replace(/\s+/g, "-").toLowerCase()}-qr.png`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-sm overflow-hidden">
        <div className="p-6 text-center">
          <h3 className="text-sm font-semibold mb-1">Share this {title.includes("Semester") ? "resource" : title.split(" ").pop()}</h3>
          <p className="text-xs text-muted-foreground mb-4 truncate">{title}</p>

          {/* QR Code */}
          <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-4">
            <QRCodeSVG
              id="qr-code-svg"
              value={url}
              size={180}
              level="M"
              includeMargin={false}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          {/* Social Share Options */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-transparent transition-colors ${social.color}`}
              >
                <social.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Copy & Download */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Link2 className="w-4 h-4 mr-1.5" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-1.5" />
              QR Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
