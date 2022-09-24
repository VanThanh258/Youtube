import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
  } from "react-native";
  import React from "react";
  import { Entypo } from "@expo/vector-icons";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchChannel } from "../src/store/channelSlice";
  import { fetchOneVideo } from "../src/store/videoSlice";
  import { useRef } from "react";
  const VideoCardSearch = ({
    channelId,
    onNavigation,
    thumbnail,
    title,
    channelTitle,
    view,
    time,
    videoId
  }) => {
  
    const dispatch = useDispatch();
    const channel = useSelector((state) => state.channel);
    const { listChannel } = channel;
    const channel1 = listChannel.find((item) => item.id === channelId);
    const listVideo = useSelector(state => state.video.listVideo);
    const video = listVideo.find(item => item.id === videoId)

    // let viewString = useRef('');
  
    useEffect(() => {
      dispatch(fetchChannel(channelId));
    }, []);

    useEffect(() => {
        dispatch(fetchOneVideo(videoId));
    },[])

    const showView = (view) => {
        if (view > 1000000) {
          viewString = (view / 1000000).toFixed(1) + "Tr" + " lượt xem";
        } else if (view > 1000) {
          viewString = (view / 1000).toFixed(0) + "N" + " lượt xem";
        }
        return viewString;
      }

    // viewString = showView(video?.statistics?.viewCount)
      
    return (
      <Pressable style={{ marginTop: 5, flex: 1 }} onPress={onNavigation}>
        {/* Video component */}
        <View>
          {/* Thumbnail */}
          <View>
            <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
            {/* <View style={styles.timeContainer}>
                <Text style={styles.time}>15:23</Text>
              </View> */}
          </View>
          {/* Title row */}
          <View style={styles.titleRow}>
            {channel1 ? (
              <Image
                style={styles.avatar}
                source={{ uri: channel1.snippet.thumbnails.high.url }}
              />
            ) : (
              <Image style={styles.avatar} />
            )}
            <View style={styles.content}>
              <Text style={styles.titleContent} numberOfLines={2}>
                {title}
              </Text>
              <Text style={styles.subContent}>
                {channelTitle} - {/*{viewString}*/} - {time}
              </Text>
            </View>
            <Entypo name="dots-three-vertical" size={15} color="black" />
          </View>
        </View>
      </Pressable>
    );
  };
  
  export default VideoCardSearch;
  
  const styles = StyleSheet.create({
    thumbnail: {
      width: "100%",
      aspectRatio: 16 / 9,
    },
    timeContainer: {
      width: 50,
      height: 25,
      backgroundColor: "#00000099",
      position: "absolute",
      right: 5,
      bottom: 5,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
    time: {
      color: "white",
    },
    titleRow: {
      flexDirection: "row",
      paddingVertical: 14,
      paddingHorizontal: 12,
      backgroundColor: "white",
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
    },
    content: {
      flex: 1,
      marginLeft: 12,
    },
    titleContent: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subContent: {
      color: "#6C6C6C",
      fontSize: 12,
    },
  });