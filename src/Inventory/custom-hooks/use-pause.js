import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { funcPause } from "../myRedux/myActions"

const usePause = () => {
    const isPause = useSelector((state) => state.isPause)
    const dispatch = useDispatch()

    const handlePause = (boolean) => {
        dispatch(funcPause(boolean))
    }

    return [isPause, handlePause]
}
export default usePause