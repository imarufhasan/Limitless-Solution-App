import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";

const { width } = Dimensions.get("window");

type BannerItemProps = {
  image: string;
};

export default function BannerItem({ image }: BannerItemProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View
      style={{
        width: width - 32,
        height: 130,
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
        resizeMode="contain"
        onLoadEnd={() => setImageLoading(false)}
      />
    </View>
  );
}