import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";

const { width } = Dimensions.get("window");

type BannerItemProps = {
  image: string;
};

export default function BannerItem({ image }: BannerItemProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const bannerWidth = width - 32;
const bannerHeight = bannerWidth * 0.42;

  return (
    <View
      style={{
        width: bannerWidth,
        height: bannerHeight,
        marginRight: 12,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#E5E7EB", 
      }}
    >
      {/* LOADING PLACEHOLDER */}
      {imageLoading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#D1D5DB",
          }}
        />
      )}

      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
        onLoadEnd={() => setImageLoading(false)}
      />
    </View>
  );
}