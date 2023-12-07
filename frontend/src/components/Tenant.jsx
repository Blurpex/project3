import { useState } from "react"

const Tenant = () => {

    const [requestData, setRequestData] = useState({
        address: '',
        location: 'Living Room',
        description: '',
        image: undefined,
        date: new Date().toLocaleString(),
        status: 'Pending'
    })

    const [rejected, setRejected] = useState(false)

    // keep track of data entered into input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setRequestData((data) => ({ ...data, [name]: value}))
    }

    // issue a new request
    const insertRequest = (e) => {
        e.preventDefault()
        const url = 'http://localhost:3000/requests'
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        }
        console.log(config.body)
        fetch(url, config)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.errror(error))
    }

    return(
        <form onSubmit={insertRequest}>
            <label>Address
                <input type="text" name="address" value={requestData.address} onChange={handleInputChange} required />
            </label>
            <label>Location
                <select name="location" value={requestData.location} onChange={handleInputChange} required>
                    <option value="Living Room">Living Room</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label>Description
                <textarea name="description" value={requestData.description} onChange={handleInputChange} required />
            </label>
            <label>Image
                <input type="file" name="image" accept="image/png, image/jpeg"  onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
            {
                rejected &&
                <p>Request Rejected</p>
            }
        </form>
    )
}

export default Tenant
