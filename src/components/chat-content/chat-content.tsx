import { Link, useParams } from 'react-router-dom';
import { ChevronLeft,SendFill } from 'react-bootstrap-icons';
import { useEffect, useState, SyntheticEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import ChatBubble from '../chat-bubble/chat-bubble';



interface ChatContentURL {
	url: string;
}

interface ChatMessage {
	chatContent: string;
	createdAt: number;
	ours: boolean;
}

interface Message {
	id: number;
	content: string;
	inbox_id: number;
	conversation_id: number;
	message_type: number;
	content_type: string;
	status: string;
	content_attributes: any;
	created_at: number;
	private: boolean;
	source_id: any;
	sender: {
		id: number;
		name: string;
		available_name: string;
		avatar_url: string;
		type: string;
		availability_status: string;
		thumbnail: string;
	};
}

interface ChatBubbleProps {
	chatContent: string;
	createdAt: number;
	ours: boolean;
}
const ChatContent = ({ url }: ChatContentURL) => {
	const [text, setText] = useState('');
	const chatId = useParams<{ chatId: string }>();

	url = url + chatId.chatId + '/messages';
	console.log("url", url)
	if (chatId.chatId === '0' || chatId.chatId === 'undefined') {
		return (<h1> Chat {chatId.chatId} does not exist</h1>);
	}


	const [chatMessages, setChatMessages] = useState<ChatBubbleProps[]>([]);



	useEffect(() => {
		const makeAPICall = async () => {
			try {
				const response = await fetch(url);
				const response_json = await response.json();
				console.log("response_json", response_json["payload"]);
				return response_json["payload"];

			} catch (error) {
				console.error(error);
			}
		};

		makeAPICall().then((response) => {
			console.log('done');
			console.log("message :as", response);
			const chatBubbles: ChatBubbleProps[] = response.map((message: Message) => {
				const chatContent: string = message.content;
				const createdAt: number = message.created_at;
				let ours = true;
				if (message.sender?.type !== "user") {
					ours = false;
				}
				return { chatContent, createdAt, ours };
			});
			console.log("response", response);
			setChatMessages(chatBubbles);
			console.log("chatBubbles", chatBubbles);

		}).catch((error) => {
			console.error(error);
		});
	}, []);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		try {

			const response = await fetch('http://localhost:8081/conversations/' + chatId.chatId + '/messages/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					content: text,
					message_type: "outgoing",
					private: false
				})
			});
			const data = await response.json();
			console.log("data", data)
			
		} catch (error) {
			console.error(error);
		}
	}


	const handleChange = (event: SyntheticEvent) => {
		setText((event.target as HTMLInputElement).value);
		console.log("text", text);
		console.log("event", event);
	};


	return (
		<>
			<Link to={`/`}><ChevronLeft style={{ cursor: 'pointer' }} /></Link>
			{/* {userData} */}
			<div style={{ height: '200px', overflowY: 'scroll' }}>
				<ChatBubble imageUrl="https://via.placeholder.com/100x100" createdAt={1} ours={true} chatContent='' />
				{chatMessages.map((chatBubble: ChatBubbleProps) => {
					return <ChatBubble imageUrl='' key={Math.floor(Math.random() * 10020) + 1} chatContent={chatBubble.chatContent} createdAt={chatBubble.createdAt} ours={chatBubble.ours} />
				})}

			</div>

			<div>
				<Form onSubmit={handleSubmit} >
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Control as="textarea" rows={3} onChange={handleChange} value={text} />
						<Button style={{bottom: '15px',position: 'relative'	}} type="submit"><SendFill/></Button>
					</Form.Group>
					
				</Form>
			</div>
		</>
	);
};

export default ChatContent;



  