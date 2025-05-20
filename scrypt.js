async function sendMessage() {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value;
    if (!userMessage) return;

    const userDiv = document.createElement('div');
    userDiv.className = 'user-message message';
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);

    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    const endpoint = 'url';
    const apiKey = 'chave';
    const deploymentId = 'gpt-4';
    const apiVersion = '2025-01-01-preview';

    const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

    const data = {
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 50,
        temperature: 0.3,
    };

    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message message';

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            botDiv.textContent = botMessage;
        } else {
            console.error('Erro na requisição', response.status, response.statusText);
            botDiv.textContent = 'Erro ao se comunicar com o serviço.';
        }

        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error('Erro:', error);
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message message';
        botDiv.textContent = 'Erro ao se comunicar com o serviço.';
        chatBox.appendChild(botDiv);
    }
}
