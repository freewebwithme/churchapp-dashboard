import React from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../queries/Query.js";
import { SlideImageCard } from "./components/SlideImageCard.js";
import Loading from "./components/Loading.js";

export default function SlideImagePage() {
  // This state is for checking slide image 1 is not empty
  // if it is not empty then make upload button of slide image 2 is active
  const [slideImageOne, setSlideImageOne] = React.useState(null);
  const [slideImageTwo, setSlideImageTwo] = React.useState(null);
  const [slideImageThree, setSlideImageThree] = React.useState(null);

  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      console.log("Printing from onCompleted: Query: ", data);
      const church = data.me.church;
      // set slide image state to display newly uploaded slide image.
      setSlideImageOne(church.slideImageOne);
      setSlideImageTwo(church.slideImageTwo);
      setSlideImageThree(church.slideImageThree);
    },
  });

  if (loadingMe) return <p>Loading...</p>;

  return (
    <GridContainer>
      {loadingMe ? (
        <Loading />
      ) : (
        <GridContainer>
          <GridItem xs={4}>
            <SlideImageCard
              slideImage={slideImageOne}
              setSlideImage={setSlideImageOne}
              slideImageNumber="sliderOne"
              title="첫번째 슬라이드"
            />
          </GridItem>
          <GridItem xs={4}>
            <SlideImageCard
              slideImage={slideImageTwo}
              setSlideImage={setSlideImageTwo}
              slideImageNumber="sliderTwo"
              title="두번째 슬라이드"
            />
          </GridItem>
          <GridItem xs={4}>
            <SlideImageCard
              slideImage={slideImageThree}
              setSlideImage={setSlideImageThree}
              slideImageNumber="sliderThree"
              title="세번째 슬라이드"
            />
          </GridItem>
        </GridContainer>
      )}
    </GridContainer>
  );
}
