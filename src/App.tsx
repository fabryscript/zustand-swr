import { Typography, Box, Card, Chip, Button } from "@mui/joy";
import { BsBookmarkPlus, BsPlusLg } from "react-icons/bs";
import { useFavoritesStore } from "./store/favorites";
import useSWR from "swr";
import { decapitalize, fetcher, getPrice } from "./api/recommendations";
import Navbar from "./components/Navbar";

function App() {
  const [addFavorite] = useFavoritesStore((state) => [state.addFavorite]);

  const { data, error, isLoading, mutate } = useSWR(
    "https://www.boredapi.com/api/activity",
    fetcher
  );
  const fetchData = () => mutate();

  if (error)
    return (
      <Typography textAlign={"center"}>
        holy moly! an error occurred!!
      </Typography>
    );

  return (
    <Box>
      <Navbar />
      <Box sx={{ textAlign: "center", mt: "20%" }}>
        <Typography level="h1">IBWDID?</Typography>
        <Typography level="h2">I'm bored, what do I do?</Typography>
        <Typography level="body1">
          here, get some recommendations and add the ones you like into your
          favorites.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", placeItems: "center" }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Card
              sx={{ maxWidth: "400px", minWidth: "300px", textAlign: "center", mt: "5%" }}
            >
              <Typography level="h3">{decapitalize(data.activity)}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip variant="soft">{data.type}</Chip>
                <Chip variant="soft" color="success">
                  {getPrice(data.price)}
                </Chip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  startDecorator={<BsBookmarkPlus />}
                  onClick={() => addFavorite(data)}
                >
                  add to favorites
                </Button>
                <Button
                  startDecorator={<BsPlusLg />}
                  onClick={fetchData}
                  variant="soft"
                >
                  generate new
                </Button>
              </Box>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
