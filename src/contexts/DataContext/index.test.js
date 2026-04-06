import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

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
};

describe("When a data context is created", () => {
    it("a call is executed on the events.json file", async () => {
        api.loadData = jest.fn().mockReturnValue({ result: "ok" });
        const Component = () => {
            const { data } = useData();
            return <div>{data?.result}</div>;
        };
        render(
            <DataProvider>
                <Component />
            </DataProvider>
        );
        const dataDisplayed = await screen.findByText("ok");
        expect(dataDisplayed).toBeInTheDocument();
    });

    describe("and the events call failed", () => {
        it("the error is dispatched", async () => {
            window.console.error = jest.fn();
            api.loadData = jest.fn().mockRejectedValue("error on calling events");
            const Component = () => {
                const { error } = useData();
                return <div>{error}</div>;
            };
            render(
                <DataProvider>
                    <Component />
                </DataProvider>
            );
            const dataDisplayed = await screen.findByText("error on calling events");
            expect(dataDisplayed).toBeInTheDocument();
        });
    });

    it("api.loadData resolves with data", async () => {
        api.loadData = jest.fn().mockResolvedValue(mockData);
        const Component = () => {
            const { data } = useData();
            return <div>{data?.events?.[0]?.title}</div>;
        };
        render(
            <DataProvider>
                <Component />
            </DataProvider>
        );
        const dataDisplayed = await screen.findByText("Événement récent");
        expect(dataDisplayed).toBeInTheDocument();
    });

    it("api.loadData rejects with an error", async () => {
        api.loadData = jest.fn().mockRejectedValue("fetch error");
        const Component = () => {
            const { error } = useData();
            return <div>{error}</div>;
        };
        render(
            <DataProvider>
                <Component />
            </DataProvider>
        );
        const dataDisplayed = await screen.findByText("fetch error");
        expect(dataDisplayed).toBeInTheDocument();
    });

    it("last is the most recent event", async () => {
        api.loadData = jest.fn().mockResolvedValue(mockData);
        const Component = () => {
            const { last } = useData();
            return <div>{last?.title}</div>;
        };
        render(
            <DataProvider>
                <Component />
            </DataProvider>
        );
        const dataDisplayed = await screen.findByText("Événement récent");
        expect(dataDisplayed).toBeInTheDocument();
    });
});