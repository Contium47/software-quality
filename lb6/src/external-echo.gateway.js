export class ExternalEchoGateway {
    constructor(baseUrl = 'https://echo-service.example.com/api/echo') {
        this.baseUrl = baseUrl;
    }

    async echo(message) {
        if (!message || typeof message !== 'string') {
            throw new Error('message must be a non-empty string');
        }

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(
                `External echo gateway failed with status ${response.status}`
            );
        }

        const data = await response.json();
        if (data.echo === undefined && data.message === undefined) {
            throw new Error('Invalid echo response: missing echo/message field');
        }

        return data.echo ?? data.message;
    }
}
