import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';


interface ChatContentURL {
  // match: any;
  url: string;
}



const ChatContent = ({ url }: ChatContentURL) => {
  const { chatId } = useParams<{ chatId: string }>();
  const [userData, setUserData] = useState<any | null>(null);


  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("response", response)
        console.log("chatID :",chatId+" <"+typeof(chatId)+">")
       
        setUserData(json["payload"][chatId]["meta"]["sender"]["name"])

      } catch (error) {
        console.log(error)
        console.error(error);

      }
    };

    makeAPICall().then((response) => {
      console.log('done');
      let userdata=userData;
       ;
     
    });
  }, []);


  return (
    <>
      <Link to={`/`}><ChevronLeft style={{ cursor: 'pointer' }} /></Link> {userData}
     
    </>
  );
};

export default ChatContent;


