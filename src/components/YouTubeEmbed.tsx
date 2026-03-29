import { getYoutubeEmbedUrl } from "@/lib/api";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const YouTubeEmbed = ({ url }: { url: string }) => {
  const embedUrl = getYoutubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl shadow-lg">
      <iframe
        src={embedUrl}
        title="Recipe video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </AspectRatio>
  );
};

export default YouTubeEmbed;
