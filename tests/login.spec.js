
import { test, expect } from '@playwright/test';
import path from 'path';


test.describe("suites de test l'interface login", ()=>{
    // Chemin absolu vers votre fichier HTML
    const loginPagePath = 'file://' + path.resolve('./frontend/login.html');

    test('Test de connexion', async ({ page }) => {

        //Arrange
        // 1. Charger la page locale
        await page.goto(loginPagePath);
        
        //Assert
        // 2. Vérifier les éléments de base
        await expect(page.locator('h1')).toHaveText('Bienvenue sur Propelize');

        });

})