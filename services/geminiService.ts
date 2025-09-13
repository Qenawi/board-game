import { GoogleGenAI, Type } from "@google/genai";

const GAME_CONCEPT = `
You are the "Game Master AI" for a Python-based board game development terminal.
Your primary job is to interpret user commands and translate them into two things: 
1. A helpful Python code snippet for the user's terminal.
2. A structured JSON object representing the corresponding change in the game state.

The game is on an 8x8 board (coordinates 0-7 for x and y).
Characters: 'Mage', 'Archer', 'Warrior', 'Assassin', 'Caster'.
Players: 1 and 2.

You MUST respond with a JSON object that conforms to the provided schema.
Your available actions are 'place', 'move', 'attack', 'info', or 'error'.

- 'place': User wants to add a character. Requires 'character', 'player', and 'position'.
- 'move': User wants to move a character. Requires 'from' and 'to' positions.
- 'attack': User wants one character to attack another. Requires 'attacker' and 'target' positions.
- 'info': User asks for help, a function, or a class definition. Provide code/text in 'textResponse'.
- 'error': Command is unclear or invalid. Explain why in 'textResponse'.

Do not make up new actions. The python code in textResponse should always be inside a markdown block.
`;

const positionSchema = {
    type: Type.OBJECT,
    properties: {
        x: { type: Type.INTEGER },
        y: { type: Type.INTEGER }
    },
    required: ['x', 'y']
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        action: {
            type: Type.STRING,
            enum: ['place', 'move', 'attack', 'info', 'error']
        },
        details: {
            type: Type.OBJECT,
            properties: {
                character: { 
                    type: Type.STRING,
                    enum: ['Mage', 'Archer', 'Warrior', 'Assassin', 'Caster']
                },
                player: {
                    type: Type.INTEGER,
                },
                position: positionSchema,
                from: positionSchema,
                to: positionSchema,
                attacker: positionSchema,
                target: positionSchema,
            },
            nullable: true,
        },
        textResponse: {
            type: Type.STRING,
            description: "The Python code or text message to display in the terminal. Code should be in a markdown block."
        }
    },
    required: ['action', 'textResponse']
};

export interface GameAction {
  action: 'place' | 'move' | 'attack' | 'info' | 'error';
  details?: {
    character?: 'Mage' | 'Archer' | 'Warrior' | 'Assassin' | 'Caster';
    player?: 1 | 2;
    position?: { x: number; y: number };
    from?: { x: number; y: number };
    to?: { x: number; y: number };
    attacker?: { x: number; y: number };
    target?: { x: number; y: number };
  };
  textResponse: string;
}

// Assume process.env.API_KEY is available in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey });

export async function runCommand(command: string): Promise<GameAction> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `User command: "${command}"`,
            config: {
                systemInstruction: GAME_CONCEPT,
                temperature: 0.3,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GameAction;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return {
                action: 'error',
                textResponse: `API Error: ${error.message}`
            };
        }
        return {
            action: 'error',
            textResponse: "An unexpected error occurred while contacting the AI."
        };
    }
}