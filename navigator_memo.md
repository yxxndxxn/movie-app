## navigator 정리

같은 Navigator 안에서 스크린을 변경하는 경우, navigate를 사용하고({navigation:{navigate}})
스크린 이름만 넣어주면 됨(navigate("Two))

만약 하나의 Navigator가 두 개의 다른 Navigator를 렌더링하고 있고 NAvigator 사이를 이동하고 싶으면,
먼저 이동하고 싶은 Navigator의 이름을 구체적으로 지정해야 함(Stack), 그리고 그 Navigator 안에 있는 스크린 이름을 입력해야함

예를 들면 Movies.js 처럼 이렇게!

<!-- export default function Movies({ navigation: { navigate } }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  );
} -->

<TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
-> Tabs로 가서 search 스크린으로 이동

구조도는
Root{
Tab{
Movies -> navigate(Stack, {screen: One})
}
Stack{
One -> navigate(Tabs, {screen:Search})
}
}

이거인거지
