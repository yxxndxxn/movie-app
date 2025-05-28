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
    width: 100,
    height: 160,
    borderRadius: 5
  },
})