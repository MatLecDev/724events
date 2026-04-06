describe("Contact form", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.contains("Nos services").should("be.visible");
    });

    it("should display all form fields", () => {
        cy.contains("Nom").should("be.visible");
        cy.contains("Prénom").should("be.visible");
        cy.contains("Email").should("be.visible");
        cy.contains("Message").should("be.visible");
        cy.contains("Personel / Entreprise").should("be.visible");
        cy.contains("Envoyer").should("be.visible");
    });

    it("should show success message after form submission", () => {
        cy.get("#contact").scrollIntoView();

        cy.contains("Nom").parent().find("input").type("Dupont");
        cy.contains("Prénom").parent().find("input").type("Jean");
        cy.contains("Email").parent().find("input").type("jean.dupont@email.com");
        cy.contains("Message").parent().find("textarea").type("Bonjour, je souhaite vous contacter.");

        cy.contains("Envoyer").click();

        cy.contains("En cours").should("be.visible");

        cy.contains("Message envoyé !", { timeout: 10000 }).should("be.visible");
        cy.contains("Merci pour votre message").should("be.visible");
    });

    it("should close the modal after clicking the close button", () => {
        cy.get("#contact").scrollIntoView();

        cy.contains("Nom").parent().find("input").type("Dupont");
        cy.contains("Prénom").parent().find("input").type("Jean");
        cy.contains("Email").parent().find("input").type("jean.dupont@email.com");
        cy.contains("Message").parent().find("textarea").type("Bonjour.");

        cy.contains("Envoyer").click();
        cy.contains("Message envoyé !", { timeout: 10000 }).should("be.visible");

        cy.get("[data-testid='close-modal']").click();

        cy.contains("Message envoyé !").should("not.exist");
    });
});