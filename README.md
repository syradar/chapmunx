# 📜 chapmux

Add chapters to MP4 files based on a track list.

## ⚙️ Requirements

- [node](https://nodejs.org) >= 22
- [FFmpeg](https://www.ffmpeg.org/)

## Usage

## 📚 Testing

Terry Butler created a guide on how to create chapters [here](https://www.terrybutler.co.uk/2021/08/01/how-to-add-chapters-to-video-using-ffmpeg/).

### 🧪 Generate Test File

This will generate a test MP4 file:

```shell
ffmpeg -f lavfi -i color=c=red@0.2:duration=360:s=1280x720:r=10 ./test/testinput.mp4
```

### 🔍 Testing `chapmux`

To test the `chapmux` functionality:

```shell
node combine-chapters-and-video.mjs -i ./test/testinput.mp4 -t ./test/tracklist.txt
```

Feel free to let me know if you need any further improvements!
