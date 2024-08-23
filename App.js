import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";

export default function App() {
  const [cardsValues, setCardsValues] = useState([
    { cardId: 1, cardImage: "image1", show: true, found: false },
    { cardId: 2, cardImage: "image2", show: true, found: false },
    { cardId: 3, cardImage: "image3", show: true, found: false },
    { cardId: 4, cardImage: "image4", show: true, found: false },
    { cardId: 5, cardImage: "image5", show: true, found: false },
    { cardId: 6, cardImage: "image6", show: true, found: false },
    { cardId: 7, cardImage: "image7", show: true, found: false },
    { cardId: 8, cardImage: "image8", show: true, found: false },
    { cardId: 9, cardImage: "image1", show: true, found: false },
    { cardId: 10, cardImage: "image2", show: true, found: false },
    { cardId: 11, cardImage: "image3", show: true, found: false },
    { cardId: 12, cardImage: "image4", show: true, found: false },
    { cardId: 13, cardImage: "image5", show: true, found: false },
    { cardId: 14, cardImage: "image6", show: true, found: false },
    { cardId: 15, cardImage: "image7", show: true, found: false },
    { cardId: 16, cardImage: "image8", show: true, found: false },
  ]);
  const [selectedItemFirst, setSelectedItemFirs] = useState(null);
  const [selectedItemSecond, setSelectedItemSecond] = useState(null);
  const [allFounded, setAllFounded] = useState(false);

  useEffect(() => {
    const shuffledArray = shuffleArray([...cardsValues]);
    setCardsValues(shuffledArray);
  }, []);

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleRestart = () => {
    const newArray = cardsValues.map((item) => {
      return { ...item, show: true, found: false };
    });
    const shuffledArray = shuffleArray([...newArray]);
    setCardsValues(shuffledArray);
  };
  const images = {
    image1: require("./assets/pokemonImages/image1.png"),
    image2: require("./assets/pokemonImages/image2.png"),
    image3: require("./assets/pokemonImages/image3.png"),
    image4: require("./assets/pokemonImages/image4.png"),
    image5: require("./assets/pokemonImages/image5.png"),
    image6: require("./assets/pokemonImages/image6.png"),
    image7: require("./assets/pokemonImages/image7.png"),
    image8: require("./assets/pokemonImages/image8.png"),
  };

  const image = require("./assets/pokemonImages/cover-image.png");
  const imageBackGround = require("./assets/pokemonImages/backround-image.jpg");

  const handlePress = (item) => {
    if (item.show && !item.found) {
      const newCardValues = cardsValues.map((obj) => {
        if (obj.cardId === item.cardId) {
          return { ...obj, show: false };
        }
        return obj;
      });
      if (!selectedItemFirst) {
        setSelectedItemFirs(item);
      } else if (!selectedItemSecond) {
        setSelectedItemSecond(item);
      }
      setCardsValues(newCardValues);
    }
  };

  useEffect(() => {
    if (selectedItemFirst !== null && selectedItemSecond !== null) {
      if (selectedItemFirst.cardImage === selectedItemSecond.cardImage) {
        const updatedArray = cardsValues.map((obj) => {
          if (
            obj.cardId === selectedItemFirst.cardId ||
            obj.cardId === selectedItemSecond.cardId
          ) {
            return { ...obj, found: true, show: false };
          }
          return obj;
        });
        setCardsValues(updatedArray);
      } else {
        const updatedArray = cardsValues.map((obj) => {
          if (
            obj.cardId === selectedItemFirst.cardId ||
            obj.cardId === selectedItemSecond.cardId
          ) {
            return { ...obj, show: true, found: false };
          }
          return obj;
        });
        setTimeout(() => {
          setCardsValues(updatedArray);
        }, 500);
      }
      setSelectedItemFirs(null);
      setSelectedItemSecond(null);
    }
  }, [selectedItemFirst, selectedItemSecond]);

  const Item = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          onPress={() => {
            handlePress(item);
          }}
        >
          {item.show && !item.found && (
            <ImageBackground
              style={styles.cover}
              source={image}
            ></ImageBackground>
          )}
          <Image style={styles.tinyLogo} source={images[item.cardImage]} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const value = cardsValues.every((item) => item.found);
    if (value) {
      setAllFounded(value);
    }
  }, [cardsValues]);

  return (
    <>
      <ImageBackground style={styles.container} source={imageBackGround}>
        <FlatList
          data={cardsValues}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.cardId}
          numColumns={4}
          columnWrapperStyle={styles.columnWrapper} // Sütun boşluklarır
          contentContainerStyle={styles.listContent} // Liste içeriği boşlukları
        />
        {allFounded && (
          <LinearGradient
            colors={[
              "#ff0000",
              "#ffa500",
              "#ffff00",
              "#008000",
              "#0000ff",
              "#4b0082",
              "#ee82ee",
            ]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.text}>Congratulations</Text>
          </LinearGradient>
        )}
        <TouchableOpacity onPress={handleRestart} style={styles.restartButton}>
          <Text>Restart</Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "#fff",
    textAlign: "center",
  },
  restartButton: {
    borderWidth: 2,
    marginBottom: 60,
    padding: 10,
    borderRadius: 20,
    borderColor: "#355375",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  listContent: {
    paddingVertical: 20,
  },
  cover: {
    position: "absolute",
    width: 83,
    height: 150,
    top: -50,
    left: -18,
    zIndex: 1,
    borderRadius: 20,
  },
  cardWrapper: {
    borderRadius: 10,
    width: 90,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
