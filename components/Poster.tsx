import React from "react";
import { Image, StyleSheet } from "react-native";
import { makeImgPath } from "../utils";

interface PosterProps{
    path:string
}
const Poster:React.FC<PosterProps> = ({path})=>{
    return <Image style={styles.Image} source={{ uri: makeImgPath(path) }} />;

}
export default Poster;

const styles = StyleSheet.create({
Image:{
    width: 100, //포스터 이미자의 너비가 100임을 기억해~
    height: 160,
    borderRadius: 5
  },
})