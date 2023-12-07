import { useState } from 'react'

const Maintenance = () => {

    const [requests, setRequests] = useState([])
    const [requestData, setRequestData] = useState({
        address: '',
        location: '',
        date: '',
        status: ''
    })

    // keep track of data entered into input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setRequestData((data) => ({ ...data, [name]: value}))
    }

    // search for requests
    const searchRequests = (e) => {
        e.preventDefault()
        const url = new URL('http://localhost:3000/requests?')
        Object.keys(requestData).forEach((key) => {
            if (requestData[key] != '')
                url.searchParams.append(key, requestData[key])
        })  
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRequests(data)
            })
            .catch(error => console.error(error))
    }

    // mark a request as completed
    const markCompleted = (requestID) => {
        const url = 'http://localhost:3000/requests/' + requestID
        const config = { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Completed' })
        }
        console.log(url)
        console.log(config.body)
        fetch(url, config)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    return(
        <div>
            <form onSubmit={searchRequests}>
                <label>Address 
                    <input type="text" name="address" value={requestData.address} onChange={handleInputChange} />
                </label>
                <label>Location
                    <select name="location" value={requestData.location} onChange={handleInputChange}>
                        <option value="">---select one---</option>
                        <option value="Living Room">Living Room</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bathroom">Bathroom</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>Date
                    <input type="date" name="date" value={requestData.date} onChange={handleInputChange} />
                </label>
                <label>Status 
                    <select name="status" value={requestData.status} onChange={handleInputChange}>
                        <option value="">---select one---</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <button type="submit">Search</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requests.map(request => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.address}</td>
                                <td>{request.description}</td>
                                <td>{request.location}</td>
                                <td>{request.date}</td>
                                <td><img src={request.image} width="100px"/></td>
                                <td>{request.status}</td>
                                <td>
                                { 
                                    request.status === 'Pending' &&
                                    <button onClick={() => markCompleted(request.id)}>Mark Completed</button>
                                }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Maintenance
