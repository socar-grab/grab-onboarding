import {API_URL} from "../constants/default";
import {useCallback} from "react";

function Home({cars}) {
    const onClickCarItem = useCallback((id) => async () => {
        try {
            console.log(API_URL)
            const r = await fetch(`${API_URL}/cars/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            const res = await r.json()
            if (res.result !== true) {
                throw Error("Server Processing Error")
            }
            alert("신청 완료!")
        } catch (err) {
            alert("다시 시도해주세요! \n" + err.message)
        }
    }, [])
    return <div>
        <h1>쏘카 차량 신청하기 </h1>
        <ul style={styles.container}>
            {
                cars.map(car => (
                    <li style={styles.item} onClick={onClickCarItem(car.id)} key={car.id}>
                        <h3 style={styles.name}>{car.name}</h3>
                        <img src={car.image_url} width={300} height={300}/>
                    </li>
                ))
            }
        </ul>
    </div>
}

export async function getServerSideProps() {
    console.log(process.env)
    const r = await fetch(`${API_URL}/cars`)
    const res = await r.json()
    return {
        props: {
            cars: res.cars
        }
    }
}

const styles = {
    container: {
        display: "flex",
    },
    item: {
        display: "flex",
        flexDirection: "column",
        marginRight: 16,
        border: "1px solid gray"
    },
    name: {
        margin: 8,
    }
}

export default Home