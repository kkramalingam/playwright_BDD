import { Given, When, Then, setWorldConstructor } from '@cucumber/cucumber';

declare global {
  const Given: typeof Given;
  const When: typeof When;
  const Then: typeof Then;
  const setWorldConstructor: typeof setWorldConstructor;
}

export {};
