type VideoPlayerProps = {
  src: string;
  muted?: boolean;
  width: number;
  height: number;
  autoPlay?: boolean;
  poster: string;
}

export function VideoPlayer(props: VideoPlayerProps) {
  return <video {...props}/>;
}
