import { StyleSheet, Text } from "react-native";

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
  return (
    <Text style={styles.Vote}>
      {votes > 0 ? `⭐ ${votes.toFixed(1)}/10` : `Comming soon`}
    </Text>
  );
};

export default Votes;

const styles = StyleSheet.create({
  Vote: {
    marginTop: 4,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
