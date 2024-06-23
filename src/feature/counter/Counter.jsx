import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset, incrementByAmount } from "./counterSlice"
import { useState } from "react";

const Counter = () => {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [increAmt, setIncreAmt] = useState(0)

    const addValue = Number(increAmt)||0

    const resetAll =()=>{
        setIncreAmt(0);
        dispatch(reset());
    }

    return (<section >
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+ Add</button>
            <button onClick={() => dispatch(decrement())}>- Subract</button>
        </div>
        <div>
            <input type="number" value={increAmt} onChange={e => setIncreAmt(e.target.value)} />
        </div>
        <div>
            <button onClick={resetAll}>Reset</button>
            <button onClick={()=> dispatch(incrementByAmount(addValue))}>Add Amount</button>
        </div>
    </section>)
}

export default Counter