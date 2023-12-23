import { FlatList, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Pressable, Text } from "react-native";
import { TextInput } from "react-native";
import { useDebounce } from "use-debounce";

const ItemSeparator = () => (
  <View
    style={{
      height: 10,
    }}
  />
);

const SortMenu = ({ setOrderBy, setOrderDirection }) => {
  const [selectedOrder, setSelectedOrder] = useState();

  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => {
        const [orderBy, orderDirection] = itemValue.split(",");

        setSelectedOrder(itemValue);
        setOrderBy(orderBy);
        setOrderDirection(orderDirection);
      }}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT,ASC" />
      <Picker.Item
        label="Highest rated repositories"
        value="RATING_AVERAGE,DESC"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="RATING_AVERAGE,ASC"
      />
    </Picker>
  );
};

const SearchField = ({ setSearchQuery }) => {
  return (
    <View style={{ padding: 20, backgroundColor: "white" }}>
      <TextInput
        style={{ color: "black", fontSize: 20 }}
        placeholder="Search"
        onChange={(e) => {
          setSearchQuery(e.nativeEvent.text);
        }}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
  setSearchQuery,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const [showSortMenu, setShowSortMenu] = useState(false);

  return (
    <View>
      <SearchField setSearchQuery={setSearchQuery} />

      {showSortMenu ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 20,
            }}
          >
            <Pressable
              onPress={() => {
                setShowSortMenu(false);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Text style={{ fontSize: 20 }}>Sort by</Text>
              <Text style={{ fontSize: 20 }}>▲</Text>
            </Pressable>
          </View>
          <SortMenu
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 20,
          }}
        >
          <Pressable
            onPress={() => {
              setShowSortMenu(true);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Text style={{ fontSize: 20 }}>Sort by</Text>
            <Text style={{ fontSize: 20 }}>▼</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem item={item} style={{ padding: 20 }} />
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

// orderBy, orderDirection, searchKeyword, first, after

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { repositories, refetch, fetchMore } = useRepositories(
    {orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
    first: 4
  },

  );

  const onEndReach = () => {
    fetchMore();
  };

  useEffect(() => {
    refetch(orderBy, orderDirection, debouncedSearchQuery);
  }, [orderBy, orderDirection, debouncedSearchQuery]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
