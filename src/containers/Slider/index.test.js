import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-28T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

const sortedDataDesc  = data.focus.sort((a, b) => new Date(b.date) - new Date(a.date));

describe("When slider is created", () => {
    beforeEach(() => {
        window.console.error = jest.fn();
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            <DataProvider>
                <Slider />
            </DataProvider>
        );
    })

    it("all card should be in DOM", async () => {
        await screen.findByText(sortedDataDesc[0].title);
        await screen.findByText(sortedDataDesc[1].title);
        await screen.findByText(sortedDataDesc[2].title);
    });

    it('only first card should be displayed ', async() => {

        const firstCard = await screen.findByText(sortedDataDesc[0].title);
        expect(firstCard.closest(".SlideCard")).toHaveClass("SlideCard--display");

        const secondCard = await screen.findByText(sortedDataDesc[1].title);
        expect(secondCard.closest(".SlideCard")).toHaveClass("SlideCard--hide");
    });
});
