# 📥 YouTube Download and Conversion Guide

This guide provides instructions on how to use `yt-dlp` to download videos from YouTube and `ffmpeg` to convert between different media formats.

![image](https://github.com/syradar/chapmunx/assets/10453338/e1e1a633-c64e-48d0-bd26-abd42b951603)

## 🔍 Find All Available Formats

To list all available formats for a YouTube video, use the following command:

```shell
yt-dlp "https://www.youtube.com/watch?v=YOUTUBE_ID" --list-formats
```

Replace `YOUTUBE_ID` with the actual ID of the YouTube video.

## 📥 Download Audio and Video Streams and Mux with FFmpeg

To download a video with separate audio and video streams and mux them using `ffmpeg`, use the following command:

```shell
yt-dlp "https://www.youtube.com/watch?v=YOUTUBE_ID" -f 136+140 --downloader ffmpeg
```

- `-f 136+140`: Specifies the video format (136) and audio format (140) to be downloaded and muxed together.
- `--downloader ffmpeg`: Uses `ffmpeg` to mux the downloaded streams.

## 🎵 Download Audio Only

To download only the audio stream of a YouTube video, use the following command:

```shell
yt-dlp "https://www.youtube.com/watch?v=YOUTUBE_ID" -f 140
```

- `-f 140`: Specifies the audio format (140) to be downloaded.

## 🔄 Convert from One Format to Another Using FFmpeg

To convert a media file from one format to another, use the following `ffmpeg` command:

```shell
ffmpeg -i input.m4a output.mp3
```

- `-i input.m4a`: Specifies the input file.
- `output.mp3`: Specifies the output file and format.

