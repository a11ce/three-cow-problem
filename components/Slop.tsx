import { Component } from "solid-js";
import { getCowCtx } from "../game";

const Slop: Component = () => {
  const ctx = getCowCtx();

  const getEmbed = (): string => {
    const baseUrl = `https://www.youtube.com/embed/${ctx.getSlop()}`;
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
    });

    params.set("loop", "1");
    params.set("playlist", ctx.getSlop());

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div
      class="panel"
      style={{
        padding: "0",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <iframe
        src={getEmbed()}
        style={{
          width: "400%",
          height: "100%",
          border: "none",
        }}
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="YouTube video"
      />
    </div>
  );
};

export default Slop;
