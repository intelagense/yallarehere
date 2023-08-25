# Y'all Are Here

Y'all Are Here is an innovative event management app that tackles the challenge of providing seamless entry for attendees at conferences, meetups, and other events, all without requiring physical presence at the door. The app leverages real-time communication and QR codes to ensure efficient access coordination, enhancing attendee experience and event organizer efficiency.

## Key Advantages

- **Effortless Entry:** Attendees can request access by scanning a QR code with their smartphones, eliminating the need for physical tickets or waiting in lines.
- **Volunteer Coordination:** Volunteers are instantly alerted when an attendee needs access, allowing for timely assistance without requiring volunteers to be physically stationed at the door.
- **Event Organizer Freedom:** Event organizers can focus on managing the event without being tied to the door, as attendees can self-request assistance through the app.

## Usage Scenarios

- **Conferences:** Provide attendees with a hassle-free entry process while optimizing event organizer resources.
- **Meetups:** Ensure smooth access for attendees without burdening event organizers with door management.
- **Workshops and Seminars:** Enhance the experience of participants by offering a streamlined and modern access solution.

## How to Install

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.
4. Create a `.env.local` file in the root directory with the following field(s):  
    ```shell
    DB_STRING='mongodb+srv://<username>:<password>@<cluster>.mongodb.net/'
    DOMAIN='http://localhost:3000'
    ```
    (Replace bracketed values with your own credentials. You can use localhost:3000 for development. Refer to `.env.local.example`)
5. Run `npm run dev` to start the development server.
6. Open your browser and go to `http://localhost:3000` (default) to access the app.

## Contributing

We welcome contributions! If you'd like to contribute code, report bugs, or suggest features, please read our [Contribution Guidelines](CONTRIBUTING.md).
