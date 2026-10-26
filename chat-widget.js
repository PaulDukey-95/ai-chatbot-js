// Chat Widget Script
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #264653);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #4A90E2);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #353535);
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px #353535;
            border: 1px solid #A9B89B;
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 2rem 1rem;
            display: flex;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            align-items: center;
            gap: 0.75rem;
            border-bottom: 1px solid #353535;
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #F0EDE3;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 2rem;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 48px;
            height: 48px;
        }

        .n8n-chat-widget .brand-header p {
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 14px;
            font-weight: 300;
            color: #ffffff;
        }

        n8n-chat-widget .brand-header-text {
            display: flex;
            padding: 4px;
        }


        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: #F0EDE3;
            color: var(--n8n-chat-font-color);
            align-self: flex-end;
            box-shadow: 0 0px 6px rgba(0, 0, 0, 0.05);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: none;
            box-shadow: 0 0 6px rgba(73, 73, 73, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1.5px solid #26465312;
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: none;
            box-shadow: 0 0 6px rgba(73, 73, 73, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
            background: none;
            color: #353535;
            border: none;
            border-radius: none;
            padding: 0 10px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle-wrapper {
            position: fixed;
            bottom: 20px;
            right: 0; /* flush to edge */
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            pointer-events: auto;

            /* animation */
            transform: translateX(120%);
            opacity: 0;
            animation: toggle-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .n8n-chat-widget .chat-toggle-wrapper.position-left {
            right: auto;
            left: 0;
            align-items: flex-start;
            transform: translateX(-120%);
            animation: toggle-enter-left 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Square card */
        .n8n-chat-widget .chat-toggle-card {
            width: 150px;
            height: 100px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            border-radius: 14px 0 0 14px; /* flush right edge */
            box-shadow: 0 10px 28px rgba(0,0,0,0.14);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 2px;
            padding-left: 20px;
            font-size: 13px;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;

            transform: translateX(80%);
            opacity: 0;
            animation: card-enter 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.05s;
        }

        .n8n-chat-widget .chat-toggle-card img {
            width: auto;
            height: 24px;
            object-fit: contain;
        }

        /* Circle */
        .n8n-chat-widget .chat-toggle-circle {
            position: absolute;
            top: -28px;
            right: 20px;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background: #F0EDE3;
            border: none;
            color: #264653;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 7px 18px rgba(0, 0, 0, 0.2);
            cursor: pointer;

            transform: translateX(100%);
            opacity: 0;
            animation: circle-enter 0.55s cubic-bezier(0.22, 1.2, 0.36, 1) forwards;
            animation-delay: 0.18s;
        }

        .n8n-chat-widget .chat-toggle-circle:hover {
            transform: scale(1.06);
        }

        .n8n-chat-widget .chat-toggle-circle svg {
            width: 30px;
            height: 30px;
            fill: currentColor;
        }

        /* Keyframes */
        @keyframes toggle-enter {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes toggle-enter-left {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes card-enter {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes circle-enter {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* Hidden state */
        .n8n-chat-widget .chat-toggle-wrapper.hidden {
            pointer-events: none;
            animation: toggle-exit 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .n8n-chat-widget .chat-toggle-wrapper.hidden .chat-toggle-card {
            animation: card-exit 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .n8n-chat-widget .chat-toggle-wrapper.hidden .chat-toggle-circle {
            animation: circle-exit 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Exit keyframes */
        @keyframes toggle-exit {
            to {
                transform: translateX(120%);
                opacity: 0;
            }
        }

        @keyframes card-exit {
            to {
                transform: translateX(80%);
                opacity: 0;
            }
        }

        @keyframes circle-exit {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        /* Re-entry */
        .n8n-chat-widget .chat-toggle-wrapper.show {
            pointer-events: auto;
            animation: toggle-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .n8n-chat-widget .chat-toggle-wrapper.show .chat-toggle-card {
            animation: card-enter 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.05s;
        }

        .n8n-chat-widget .chat-toggle-wrapper.show .chat-toggle-circle {
            animation: circle-enter 0.55s cubic-bezier(0.22, 1.2, 0.36, 1) forwards;
            animation-delay: 0.18s;
        }


        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.5;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        /* Links in chat messages */
        .n8n-chat-widget .chat-message a {
            color: var(--chat--color-secondary, #4A90E2);
            text-decoration: underline;
            cursor: pointer;
            transition: opacity 0.2s ease;
            word-break: break-word;
        }

        .n8n-chat-widget .chat-message a:hover {
            opacity: 0.8;
        }

        .n8n-chat-widget .chat-message a:focus {
            outline: 2px solid var(--chat--color-secondary);
            border-radius: 2px;
        }

        /* Paragraphs */
         .n8n-chat-widget .chat-message p {
            margin: 8px 0;
            line-height: 1.6;
        }

        .n8n-chat-widget .chat-message p:first-child {
            margin-top: 0;
        }

        .n8n-chat-widget .chat-message p:last-child {
            margin-bottom: 0;
        }

        /* Bold text */
            .n8n-chat-widget .chat-message strong {
            font-weight: 600;
            color: var(--chat--color-font);
        }

        /* Italic text */
            .n8n-chat-widget .chat-message em {
            font-style: italic;
            color: var(--chat--color-font);
        }

        /* Headers */
            .n8n-chat-widget .chat-message h3,
            .n8n-chat-widget .chat-message h4,
            .n8n-chat-widget .chat-message h5 {
            margin: 12px 0 8px 0;
            font-weight: 600;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .chat-message h5 {
            font-size: 16px;
        }

        .n8n-chat-widget .chat-message h4 {
            font-size: 15px;
        }

        .n8n-chat-widget .chat-message h3 {
            font-size: 14px;
        }

        /* Line breaks */
            .n8n-chat-widget .chat-message br {
            display: block;
            margin: 4px 0;
        }

        
        /* Pacepoint AI typing animation */
        .n8n-chat-widget .typing-indicator {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 14px 18px;
            width: fit-content;
        }
        
        .n8n-chat-widget .typing-indicator span {
            width: 7px;
            height: 7px;
            background: var(--chat--color-primary);
            border-radius: 50%;
            display: inline-block;
            animation: pacepointTyping 1.2s infinite ease-in-out;
        }
        
        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes pacepointTyping {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.35;
            }
            30% {
                transform: translateY(-5px);
                opacity: 1;
            }
        }
        
        @media (prefers-reduced-motion: reduce) {
            .n8n-chat-widget .typing-indicator span {
                animation: none;
                opacity: 0.75;
            }
        }


    `;
   
    // Message formatting function - handles paragraphs, links, bold, italic

function parseAndFormatMessage(text) {
  if (!text) return '';

  // Escape HTML to prevent unsafe content
  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Only permit safe web URLs
  function makeLink(url, label) {
    try {
      const parsed = new URL(url);

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return escapeHTML(label);
      }

      return `<a href="${escapeHTML(parsed.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`;
    } catch {
      return escapeHTML(label);
    }
  }

  // Match HTML links, Markdown links and plain URLs
  // in one pass to avoid creating nested links
  const linkPattern = /<a\b([^>]*)>([\s\S]*?)<\/a\s*>|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>"']+)/gi;

  let html = '';
  let lastIndex = 0;

  for (const match of text.matchAll(linkPattern)) {
    html += escapeHTML(text.slice(lastIndex, match.index));

    if (match[0].toLowerCase().startsWith('<a')) {
      // Handle HTML links
      const href = match[1].match(
        /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i
      );

      const label = match[2].replace(/<[^>]*>/g, '');

      html += href
        ? makeLink(href[1] ?? href[2] ?? href[3], label)
        : escapeHTML(label);

    } else if (match[4]) {
      // Handle Markdown links
      html += makeLink(match[4], match[3]);

    } else {
      // Handle standalone URLs
      const url = match[5];
      const cleanUrl = url.replace(/[.,!?;:]+$/, '');

      html += makeLink(cleanUrl, cleanUrl);
      html += escapeHTML(url.slice(cleanUrl.length));
    }

    lastIndex = match.index + match[0].length;
  }

  html += escapeHTML(text.slice(lastIndex));

  // Preserve Markdown bold and italic formatting
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Preserve Markdown headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^# (.*?)$/gm, '<h5>$1</h5>');

  // Preserve paragraph and line-break formatting
  const paragraphs = html.split('\n\n');

  html = paragraphs
    .filter(p => p.trim())
    .map(p => {
      const lines = p.trim().split('\n');
      return `<p>${lines.join('<br>')}</p>`;
    })
    .join('');

  return html;
}





    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Powered by n8n',
                link: 'https://n8n.partnerlinks.io/m8a94i19zhqq?utm_source=nocodecreative.io'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
                    <div class="brand-header-text">
                        <p>${config.branding.name}</p>
                        <span>${config.branding.subtitle}</span>
                    </div>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Send us a message
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                    <div class="brand-header-text">
                        <p>${config.branding.name}</p>
                        <span>${config.branding.subtitle}</span>
                    </div>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message here..." rows="1"></textarea>
                <button type="submit" class="send-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#A9B89E" d="M22.83,0c.74.18,1.23.79,1.17,1.57l-6.9,21.51c-.48,1.12-1.9,1.26-2.55.22l-2.88-8.56,5.39-7.8-7.81,5.38L.64,9.41c-.34-.23-.52-.54-.64-.93v-.52c.16-.5.43-.86.93-1.07L22.31,0h.52Z"/></svg>
                </button>

            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;
    
const toggleWrapper = document.createElement('div');
toggleWrapper.className = `chat-toggle-wrapper${config.style.position === 'left' ? ' position-left' : ''}`;

toggleWrapper.innerHTML = `
  <div class="chat-toggle-card">
    <span>Just Ask</span>
    <img src="https://cdn.prod.website-files.com/688b81ddcb0a244a2369a6ce/697ce3a227270b5dbd8ec492_Pacepoint-logo-variations-14c.svg" alt="Pacepoint" />
  </div>

  <button class="chat-toggle-circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  </button>
`;

    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleWrapper);
    document.body.appendChild(widgetContainer);

    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function generateUUID() {
        return crypto.randomUUID();
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            chatContainer.querySelector('.brand-header').style.display = 'none';
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            const botText = Array.isArray(responseData)
                ? responseData[0]?.output
                : responseData?.output;
            
            if (typeof botText === 'string' && botText.trim()) {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                botMessageDiv.innerHTML = parseAndFormatMessage(botText);
                messagesContainer.appendChild(botMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            const botText = Array.isArray(data) ? data.output : data.output;
            botMessageDiv.innerHTML = parseAndFormatMessage(botText);  // ← FORMATTED
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

        } catch (error) {
            console.error('Error:', error);
        }
    }

    newChatBtn.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });
    
    toggleWrapper.addEventListener('click', () => {
        chatContainer.classList.add('open');
        toggleWrapper.classList.add('hidden');
        toggleWrapper.classList.remove('show');
    });


    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
            toggleWrapper.classList.remove('hidden');
            toggleWrapper.classList.add('show');
        });
    });

})();
