import { useState } from "react"

const Manager = () => {
    
    const [tenants, setTenants] = useState([])
    const [tenantData, setTenantData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        checkIn: '',
        checkOut: ''
    })
    
    // keep track of data entered into input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTenantData((data) => ({ ...data, [name]: value}))
    }

    // search for a tenant
    const searchTenant = () => {
        const url = new URL('http://localhost:3000/tenants?')
        Object.keys(tenantData).forEach((key) => {
            if (tenantData[key] != '')
                url.searchParams.append(key, tenantData[key])
        })
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTenants(data)
            })
            .catch(error => console.error(error))
    }

    // insert a tenant
    const insertTenant = (e) => {
        e.preventDefault()
        const url = 'http://localhost:3000/tenants'
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tenantData)
        }
        fetch(url, config)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    // update tenant data
    const updateTenant = () => {
        const url = 'http://localhost:3000/tenants/' + tenantData.id
        const config = { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                Object.fromEntries(Object.entries(tenantData).filter(([_, value]) => value !== ''))
            ) 
        }
        fetch(url, config)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    // delete a tenant
    const deleteTenant = () => {
        const url = 'http://localhost:3000/tenants/' + tenantData.id
        const config = { method: 'DELETE' }
        fetch(url, config)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    return(
        <div>
            <form onSubmit={insertTenant}>
                <label>ID
                    <input type="text" name="id" value={tenantData.id} onChange={handleInputChange} />
                </label>
                <label>Name
                    <input type="text" name="name" value={tenantData.name} onChange={handleInputChange} />
                </label>
                <label>Email
                    <input type="email" name="email" value={tenantData.email} onChange={handleInputChange} />
                </label>
                <label>Phone Number
                    <input type="phone" name="phone" value={tenantData.number} onChange={handleInputChange} />
                </label>
                <label>Address
                    <input type="text" name="address" value={tenantData.address} onChange={handleInputChange} />
                </label>
                <label>Check In Date
                    <input type="date" name="checkIn" value={tenantData.checkIn} onChange={handleInputChange} />
                </label>
                <label>Check Out Date
                    <input type="date" name="checkOut" value={tenantData.checkOut} onChange={handleInputChange} />
                </label>
                <button type="submit">Insert</button>
            </form>
            <button onClick={updateTenant}>Update</button>
            <button onClick={deleteTenant}>Delete</button>
            <button onClick={searchTenant}>Search</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tenants.map(tenant => (
                            <tr key={tenant.id}>
                                <td>{tenant.id}</td>
                                <td>{tenant.name}</td>
                                <td>{tenant.email}</td>
                                <td>{tenant.phone}</td>
                                <td>{tenant.address}</td>
                                <td>{tenant.checkIn}</td>
                                <td>{tenant.checkOut}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Manager
