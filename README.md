# 🐿️ chapmunx

Add chapters to video files based on a track list.

## ⚙️ Requirements

- [node](https://nodejs.org) >= 22
- [FFmpeg](https://www.ffmpeg.org/)

## 📄 Tracklist Format

Your tracklist should be a plain text file (.txt) where each line specifies a chapter with its start time and title in the format:

```plaintext
HH:MM:SS Chapter Title
MM:SS Chapter Title
```

### Example Tracklist

```plaintext
0:47 This is the first chapter
3:15 This is the second chapter
1:06:22 This is the third and last chapter
```

## 🛠️ Usage

To add chapters to your MP4 file, use the following command syntax:

```shell
node chapmunx.mjs [options]
```

### Options

- `-i, --inputFile <inputFile>`: Specify the input video file (.mp4). This option is required.
- `-t, --trackList <trackList>`: Specify the tracklist file (.txt). Will default to input filename but with txt extension.
- `-d, --dryRun`: Run the command in dry run mode without making any changes.
- `-v, --verbose`: Enable verbose logging for detailed output.

### Example Command

```shell
node chapmunx.mjs -i path/to/your/video.mp4
```

## 📚 Testing

Terry Butler created a guide on how to create chapters [here](https://www.terrybutler.co.uk/2021/08/01/how-to-add-chapters-to-video-using-ffmpeg/).

### 🧪 Generate Test File

This will generate a test MP4 file:

```shell
ffmpeg -f lavfi -i color=c=red@0.2:duration=360:s=1280x720:r=10 ./test/testinput.mp4
```

### 🔍 Testing `chapmunx`

To test the `chapmunx` functionality:

```shell
node src/chapmunx.mjs -i test/testinput.mp4 -t test/tracklist.txt
```

## Further reading

- [FFMETADATA](https://ffmpeg.org/ffmpeg-formats.html#Metadata-2)
- 
