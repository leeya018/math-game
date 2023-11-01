import React, { useEffect, useRef, useState } from "react";
import Input from "components/habits/Input";
import Button from "components/habits/Button";
import Error from "components/habits/Error";

const items = [
  [
    "what do I want to do ?  ",
    "what is my vision ?  ",
    "why do I want it ?",
    "what it will enable me when I get that ? ",
    "what is the reason that gives me the motivation to do so ? ",
    " what are the benefits that I will gain from having this goal as part fo my life?",
    " how do I know that I gain my goal ? ",
    " when can I expect this kind for results in my life ? ",
    " how would it look / feel , seen, when I will have this goal in my life ? ",
    "who am I when the goal has allready been accomplished ?",
  ],
  [
    "when the goal will be gain ? ",
    "who will be involved in the proccess of achiveng my goal? ",
    "who are the people which have the main part to make my plan start working ?  ",
    "what are the level of commitment this pepole have in the proccess for achiving those goals? ",
    "how we accomplish that target? ",
    "what will be the first step for achiving that target? ",
    "how would I know that I making progress towards my goals/ getting far from it ? ",
    "what are the resources that I will be using to achive my goal ?",
  ],
  [
    "what are the things that I might loose when my plan will be accomplished ? ",
    "who are the people that gonna get effected from my plan ? ",
    "who are the people that can damage the effective of that plan ? ",
    "what are the needs of those people ? ",
    "why they can object to my plan ? ",
    "what are the things in me that can distube me to gain my goal (and what needs that I have , do they surve ) ? ",
  ],
];

const POSITIONS = {
  dreamer: "Dreamer",
  actor: "Actor",
  critic: "Critic",
};

const MODEL_NAME = "DISNEY";

export default function waltdisney() {
  const [itemInd, setItemInd] = useState(0);
  const [questions, setQuestions] = useState(items[0]);
  const [questionInd, setQuestionInd] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [collection, setCollection] = useState([]);
  const [storedAnswers, setStoredAnswers] = useState([]);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log("useEffect");
    const storedDisney = JSON.parse(localStorage.getItem(MODEL_NAME));
    console.log(storedDisney);
    if (storedDisney) {
      const { answers, collection, itemInd, questionInd } = storedDisney;
      setAnswers(answers);
      setItemInd(itemInd);
      setCollection(collection);
      setQuestionInd(questionInd);
    }
  }, []);

  const reset = () => {
    setAnswers([]);
    setAnswers("");
    setItemInd(0);
    setCollection([]);
    setQuestionInd(0);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [inputRef.current]);

  useEffect(() => {
    console.log({
      itemInd,
      questionInd,
      storedAnswers,
      value: storedAnswers[itemInd] && storedAnswers[itemInd][questionInd],
    });

    const res = storedAnswers[itemInd] && storedAnswers[itemInd][questionInd];
    setAnswer(res || "");
    if (isDone()) {
      setStoredAnswers([...collection]);
    }
  }, [questionInd, itemInd]);
  console.log({ answer });
  const isDone = () => {
    return itemInd === 3;
  };
  const handleClick = () => {
    if (answer === "") return;
    if (questionInd < questions.length) {
      setAnswers((prev) => [...prev, answer]);
    }
    setQuestionInd(questionInd + 1);
  };

  useEffect(() => {
    if (questionInd >= questions.length) {
      setCollection((prev) => [...prev, answers]);
      setAnswers([]);
      setItemInd((prev) => prev + 1);
      itemInd < 2 && setQuestions(items[itemInd + 1]);
      setQuestionInd(0);
    }

    saveToLocalStorage();
  }, [questionInd]);

  const handleKeyDown = (e) => {
    console.log(e.key);

    if (e.code === "Enter") {
      handleClick();
    }
  };

  const saveToLocalStorage = () => {
    const itemToSave = {
      answers,
      collection,
      itemInd,
      questionInd,
    };
    localStorage.setItem(MODEL_NAME, JSON.stringify(itemToSave));
  };
  const getPosByInd = () => {
    return itemInd === 0
      ? POSITIONS.dreamer
      : itemInd === 1
      ? POSITIONS.actor
      : POSITIONS.critic;
  };

  console.log({ storedAnswers });
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl text-center">waltdisney</h1>
      {itemInd < 3 && (
        <div className="flex flex-col w-[50%]">
          <h2 className="font-semibold text-3xl text-center">
            {getPosByInd()}
          </h2>
          <div className="text-center text-2xl">{questions[questionInd]}</div>
          <Input
            type="text"
            name="answer"
            inputRef={inputRef}
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            size="w-full h-10"
            onKeyDown={handleKeyDown}
          />
          <Error>you can press also on Enter key</Error>
          <Button size="" onClick={handleClick}>
            click here
          </Button>
          <div className="w-full  overflow-auto">{answer}</div>
        </div>
      )}

      <div className="flex justify-center flex-col ">
        {itemInd === 3 && (
          <div className="w-[100vw] border-2 p-2">
            <h1>sumup </h1>
            <div className=" flex flex-wrap gap-2">
              <Sumup items={collection[0]} title={POSITIONS.dreamer} />
              <Sumup items={collection[1]} title={POSITIONS.actor} />
              <Sumup items={collection[2]} title={POSITIONS.critic} />
            </div>
          </div>
        )}
      </div>
      <Button
        size=""
        position="absolute top-1 right-1"
        color="bg-red"
        onClick={() => {
          localStorage.removeItem(MODEL_NAME);
          reset();
          setStoredAnswers([]);
          setTimeout(() => {
            inputRef.current.focus();
          }, 500);
        }}
      >
        clear cache
      </Button>
      {isDone() && (
        <Button
          ref={buttonRef}
          size=""
          position=""
          color="bg-green"
          onClick={() => {
            reset();
            setTimeout(() => {
              inputRef.current.focus();
            }, 500);
          }}
        >
          refactor plan ?
        </Button>
      )}
    </div>
  );
}

function Sumup({ items, title }) {
  return (
    <ul className="flex flex-col flex-1 border-2">
      <h1>{title}</h1>
      {items?.map((ans, key) => (
        <li key={key}>{ans}</li>
      ))}
    </ul>
  );
}

// {
//     "answers": [],
//     "collection": [
//         [
//             "I wanna travel the world while helping people gain their goals , in speed of light ",
//             "I am traveling the wolrd makeing 1 million dolars a day , mosts connected person ever, having rooftop parties, private cheff and he most hot women on earth , I have my own company , startup and realestaes that make me ton of moeny . have house all over the world ",
//             "I want it because I wnat to be free and have healthy life ,I wanna be different and choose my own path , I wanna be my own boss and doing the things I love every single day , I want to proof to me and the world that I can do anythign that I want , because I want to have an incredible life which I gain control over and choose my own path every single day , choose what to do ? choes the firnds in life , the partinde , the people he amount of moneny I ma doing , and hte bussinetss, and my employers ",
//             "when I gonna have those , I will have freedom, to do be and feel what ever I want , to hangout will the most smartest and successfull pepole , to visit all the places I have ever want, to have sex with the most amazing gilrs ever , to choosee my own house and living, to feel good every single day , to feel sussecssfull ,and have massive progress verey single day . I wnat to show my self, I want to shok the world and show them that I have a new level of way to do things which will make you have your goals massivly  in no time ",
//             "the reason that gives me motivatino to do so , is to be able to decide for my own life instead of letting other people or the companies do that for me . to gain total control on my life ,and never let other people tell me what I can or cannot do . because I wanna feel rich life , so rich that my heart will feel like its gonna explode from happienss every single day . I want to be meaninigful and make a change , I want to have a meaning to my existance , and not just another person who comes to earth with not useing his life for a great reason . because I know how goal oriented I can be, and I had amazing things that I gain in my life , I want to be able to do so in all expects of my life, and allow others to do the same ",
//             "Ithe benefits that I will gain from that is , fullfill a meaninigfull life, have rich life , which i can efford my self what ever I want , have sex with the most beautifull women ever , have massive progress because I will be connected to all the most rich and influencer in the world ",
//             "I know that I achive my goal when I am traveling the world and helping people to get their goals in 3 months ,  haveing 1 million dollar revienew each month , and have sex each day with hot sexy girls ",
//             "I can expect those results in Januray 20 2024",
//             "I will wake up every day near the beach , hot sexy girls in each side of the bed, I have all my commited employers that do lots of stuff to progress my bussiness, I have millions of customer all around the world , who take my courses and get better resutlts in life . I get 1 million dollar each month to my account from selling and I have an amzzing startup that make me lots of money ",
//             "when the goal is accomplished, I am the most crazy happy person in the world, I am undestputed, . I am a man of his own world , who have the most crazy disceplane and integrity ever.. I am goals oriented like arrow with motor of a missle . I am the most icredible person of all , I am a warior and a viking who will do vny thing to get his goal and even sucrifice his own life for that . "
//         ]
//     ],
//     "itemInd": 1,
//     "questionInd": 0
// }
