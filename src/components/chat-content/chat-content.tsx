import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
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
	const chatId = useParams<{ chatId: string }>();
	url = url + chatId.chatId + '/messages';
	console.log("url", url)

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
				if (message.sender.type !== "user") {
					ours = false;
				}else{
					ours = true;
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

	return (
		<>
			<Link to={`/`}><ChevronLeft style={{ cursor: 'pointer' }} /></Link>
			{/* {userData} */}
			<div style={{ height: '200px', overflowY: 'scroll' }}>
				<ChatBubble chatContent="Hello" createdAt={12} ours={true} />
				<ChatBubble chatContent="Hi" createdAt={13} ours={false} />
				<ChatBubble chatContent="How are you ?" createdAt={14} ours={true} />
				{chatMessages.map((chatBubble: ChatBubbleProps) => {
					return <ChatBubble chatContent={chatBubble.chatContent} createdAt={chatBubble.createdAt} ours={chatBubble.ours} />
				})}

			</div>
			{chatId.chatId}
			<div>
				<Form>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Control as="textarea" rows={3} />
					</Form.Group>
				</Form>
			</div>
		</>
	);
};

export default ChatContent;
