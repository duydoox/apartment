import React, { useEffect, useState,useContext } from 'react'
import { billApi } from '../../API/billApi'
import { authContext } from '../../contexts/AuthContext'
import './rooms.css'

const Bill = ({ detail, roomID }) => {
    const { authState } = useContext(authContext)
    const { user: userCurrent } = authState
    const [date, setDate] = useState({
        year: "",
        month: ""
    })
    const [message, setMessage] = useState("")
    const [createBill, setCreateBill] = useState({
        electricNumber: 0,
        waterBlockNumber: 0,
        paid: false,
        sent: false,
        otherPrice: 0,
        haveWifi: detail.haveWifi,
        description: ""
    })

    const [bill, setBill] = useState(null)

    const [showBill, setShowbill] = useState({
        elecNum: 0,
        elecMoney: 0,
        watNum: 0,
        watMoney: 0,
        roomMoney: detail.rentPrice,
        wifiMoney: 0,
        otherMoney: 0,
        totalMoney: 0
    })

    const dateBill = bill !== null ? new Date(bill[1].createAt) : new Date()
    console.log(showBill)
    useEffect(() => {
        if (bill !== null) {
            let countBill = { ...showBill }
            const en = bill[1].electricNumber - bill[0].electricNumber
            const em = +en * 4000
            const wn = bill[1].waterBlockNumber - bill[0].waterBlockNumber
            const wm = +wn * 20000
            const wfm = bill[1].haveWifi ? 50000 : 0
            countBill.elecNum = en
            countBill.watNum = wn
            countBill.elecMoney = em
            countBill.watMoney = wm
            countBill.wifiMoney = wfm
            countBill.otherMoney = +bill[1].otherPrice
            countBill.totalMoney = em + wm + showBill.roomMoney + wfm + bill[1].otherPrice
            setShowbill(countBill)
        }
    }, [bill])

    const search = async () => {
        try {
            // console.log(date)
            const res = await billApi.getBillDetail(roomID, date)
            if (res.data.success) {
                // console.log(res.data.data)
                setBill(res.data.data)
                setMessage("")
            }
            else {
                setBill(null)
                setMessage(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const create = async () => {
        try {
            const req = {
                ...createBill,
                electricNumber: Number(createBill.electricNumber),
                waterBlockNumber: Number(createBill.waterBlockNumber),
                otherPrice: Number(createBill.otherPrice)
            }
            const res = await billApi.createBill(roomID, req)
            if (res.data.success) {
                setMessage(res.data.message)
            }
            else {
                setMessage(res.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='bill'>
            {userCurrent.isAdmin &&
                <div>
                    <h4>T???o h??a ????n</h4>
                    <div className='flex-between '>
                        <div>
                            <label>S??? ??i???n: </label><br />
                            <input type="text" placeholder='Electric number' className='crbill billInput'
                                onChange={(e) => { setCreateBill({ ...createBill, electricNumber: e.target.value }) }} value={createBill.electricNumber} /><br />
                        </div>
                        <div>
                            <label>S??? n?????c: </label><br />
                            <input type="text" placeholder='Water block number' className='crbill billInput'
                                onChange={(e) => { setCreateBill({ ...createBill, waterBlockNumber: e.target.value }) }} value={createBill.waterBlockNumber} /><br />
                        </div>
                    </div>
                    <div className="flex-between">
                        <div>
                            <label>Ti???n kh??c: </label><br />
                            <input type="text" placeholder='Other money' className='crbill billInput'
                                onChange={(e) => { setCreateBill({ ...createBill, otherPrice: e.target.value }) }} value={createBill.otherPrice} /><br />
                        </div>
                        <div>
                            <label>Ghi ch??: </label><br />
                            <input type="text" placeholder='description' className='crbill billInput'
                                onChange={(e) => { setCreateBill({ ...createBill, description: e.target.value }) }} value={createBill.description} /><br />
                        </div>
                    </div>
                    <button className='btn-search_bill' onClick={create}>T???o</button>
                </div>
            }
            <h4>T??m ki???m</h4>
            <div className='form-search_bill'>
                <input type="text" placeholder='nh???p th??ng' className='billInput'
                    onChange={(e) => { setDate({ ...date, month: e.target.value }) }} value={date.month} />
                <input type="text" placeholder='nh???p n??m' className='billInput'
                    onChange={(e) => { setDate({ ...date, year: e.target.value }) }} value={date.year} />
                <button className='btn-search_bill' onClick={search}>T??m</button>
            </div>

            {bill !== null &&
                <div>
                    <h4>H??a ????n</h4>
                    <p className='datebill'>Ng??y {dateBill.getDate()} th??ng {dateBill.getMonth()} n??m {dateBill.getFullYear()}</p>
                    <table border="1" cellSpacing="0" cellPadding="10" width='100%' className='table'>
                        <tr className='tbl-head'>
                            <td>T??n</td>
                            <td>S??? l?????ng</td>
                            <td>????n gi??(VND)</td>
                            <td>Th??nh ti???n(VND)</td>
                        </tr>
                        <tr>
                            <td>Ti???n ph??ng</td>
                            <td>1</td>
                            <td>{showBill.roomMoney}</td>
                            <td>{showBill.roomMoney}</td>
                        </tr>
                        <tr>
                            <td>??i???n</td>
                            <td>{showBill.elecNum}</td>
                            <td>4.000</td>
                            <td>{showBill.elecMoney}</td>
                        </tr>
                        <tr>
                            <td>N?????c</td>
                            <td>{showBill.watNum}</td>
                            <td>20.000</td>
                            <td>{showBill.watMoney}</td>
                        </tr>
                        <tr>
                            <td>Wifi</td>
                            <td>{bill[1].haveWifi ? 1 : 0}</td>
                            <td>50.000</td>
                            <td>{showBill.wifiMoney}</td>
                        </tr>
                        <tr>
                            <td>Kh??c</td>
                            <td></td>
                            <td></td>
                            <td>{showBill.otherMoney}</td>
                        </tr>
                        <tr>
                            <td>T???ng</td>
                            <td></td>
                            <td></td>
                            <td>{showBill.totalMoney}</td>
                        </tr>
                    </table>
                    <p>Ghi ch??: {bill[1].description}</p>
                </div>
            }
            <span className='message'>{message}</span>
        </div>
    )
}

export default Bill