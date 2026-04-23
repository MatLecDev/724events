import {fireEvent, render, screen, within} from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const mockData = {
    events: [
        {
            id: 1,
            title: "Événement récent",
            date: "2022-08-29T20:28:45.744Z",
            cover: "/images/image1.png",
            type: "conférence",
        },
        {
            id: 2,
            title: "Événement ancien",
            date: "2022-01-29T20:28:45.744Z",
            cover: "/images/image2.png",
            type: "soirée entreprise",
        },
        {
            id: 3,
            title: "Événement intermédiaire",
            date: "2022-04-29T20:28:45.744Z",
            cover: "/images/image3.png",
            type: "expérience digitale",
        },
    ],
    focus: [],
};

const renderWithProvider = () => {
    render(
        <DataProvider>
            <Home />
        </DataProvider>
    );
}

describe("When Form is created", () => {
    beforeEach(() => {
        api.loadData = jest.fn().mockResolvedValue(mockData);
    });

    it("a list of fields card is displayed", async () => {
        renderWithProvider();
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
        it("the success message is displayed", async () => {
            renderWithProvider();
            fireEvent(
                await screen.findByText("Envoyer"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            await screen.findByText("En cours");
            await screen.findByText("Message envoyé !");
        });
    });
});

describe("When a page is created", () => {
    beforeEach(() => {
        api.loadData = jest.fn().mockResolvedValue(mockData);
    });

    it("a list of events is displayed", async () => {
        renderWithProvider();
        const eventCards = await screen.findAllByTestId("card-testid");
        expect(eventCards.length).toBeGreaterThan(0);
    });

    it("a list of people is displayed", async () => {
        renderWithProvider();
        await screen.findByText("Samira");
        await screen.findByText("Jean-baptiste");
        await screen.findByText("Alice");
        await screen.findByText("Luís");
        await screen.findByText("Christine");
        await screen.findByText("Isabelle");
    });

    it("a footer is displayed", async () => {
        renderWithProvider();
        await screen.findByText("Notre derniére prestation");
        await screen.findByText("Contactez-nous");
        await screen.findByText("45 avenue de la République, 75000 Paris");
    });

    it("an event card, with the last event, is displayed", async () => {
        renderWithProvider();
        const footer = await screen.findByRole("contentinfo");
        const eventCard = await within(footer).findByTestId("card-testid");
        expect(eventCard).toBeInTheDocument();
    });
});