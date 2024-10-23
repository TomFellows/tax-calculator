# Tax Calculator

## Running the project locally

1. Ensure that you have pulled and are running the server Docker image

```
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

2. Install package dependencies

```
npm ci
```

3. Run the project

```
npm run dev
```

## Roadmap

- Component library with Storybook
- Visual Testing with Storybook
- Expanded testing (responsiveness, styling)
- Accessibility audit + improvements
