import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type InputEvent = ChangeEvent<HTMLInputElement>;

function generateListNumber(): number[] {
  return [1, 2, 3, 4, 5, 6, 7];
}

function randomRgb() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}
function Home() {
  const [name, setName] = useState("");
  const [refName, setRefName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const prevInputValueRef = useRef<{ value: string | null }>({ value: null });

  const handleChangeName = (e: InputEvent) => {
    setName(e.target.value);
  };

  // memoize data with dependencies
  const listNumbers = useMemo(() => generateListNumber(), []);

  /**
   * (1) => a => handleChangRefName with name = a
   * (2) => as => handleChangRefName with name = as
   * (3) => asd => handleChangRefName with name = asd
   */
  const handleChangeRefName = useCallback(() => {
    setRefName(name);
  }, [name]);
  // const handleChangeRefName = () => {
  //   setRefName(name);
  // };

  // // call only once when this componet create
  // useEffect(() => {
  //   console.log("Call effect");
  // }, []);

  // // call every re-render component
  // useEffect(() => {
  //   console.log("call every re-render");
  // });

  const handleRedoName = () => {
    const prevValue = prevInputValueRef.current.value;
    console.log(
      "preInputValueRef.current.value",
      prevInputValueRef.current.value
    );
    if (!prevValue) return;

    setName(prevValue);
  };

  // call every name change
  useEffect(() => {
    handleChangeRefName();

    if (!inputRef.current) return;

    inputRef.current.style.color = randomRgb();
    return () => {
      // clean up every name change
    };
  }, [name]);

  useEffect(() => {
    prevInputValueRef.current.value = name.slice(0, -1);
  }, [name]);

  return (
    <div onClick={handleRedoName}>
      <button>Redo name</button>
      <input ref={inputRef} value={name} onChange={handleChangeName} />
      <p>name value: {name}</p>
      <p>ref name value: {refName}</p>
      {listNumbers.map((number) => (
        <li key={number}>{number}</li>
      ))}
    </div>
  );
}

export default Home;
