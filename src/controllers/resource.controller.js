import { pool } from "../database/connection.js";

export const getResource = async (req, res) => {
        const [resourceTable] = await pool.query("SELECT * FROM resource")
        const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
        const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
        let resource = []

        const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

        resourceTable.map((resourceData)=>{

            resource = [...resource,{id: resourceData.idResource,
                                     resourceName: resourceData.resourceName,
                                     isVisible: resourceData.isVisible === 0 ? false : true,
                                     dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                        
                                                
        }]})
        res.json(resource)


            
}

export const deleteResource = async (req, res) => {
    await pool.query("DELETE FROM resource WHERE idResource = ?", [req.params.id])

    const [resourceTable] = await pool.query("SELECT * FROM resource")
    const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
    const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
    let resource = []

    const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

    resourceTable.map((resourceData)=>{

        resource = [...resource,{id: resourceData.idResource,
                                 resourceName: resourceData.resourceName,
                                 isVisible: resourceData.isVisible === 0 ? false : true,
                                 dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                    
                                            
    }]})
    res.json(resource)
}

export const deleteReserveHour = async (req, res) => {
    await pool.query("DELETE FROM schedule_data WHERE idSchedule = ?", [req.params.id])
    const [resourceTable] = await pool.query("SELECT * FROM resource")
    const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
    const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
    let resource = []

    const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

    resourceTable.map((resourceData)=>{

        resource = [...resource,{id: resourceData.idResource,
                                 resourceName: resourceData.resourceName,
                                 isVisible: resourceData.isVisible === 0 ? false : true,
                                 dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                    
                                            
    }]})
    res.json(resource)
}

export const postResource = async (req, res) => {
    const {resourceName, isVisible} = req.body
    await pool.query("INSERT INTO resource (resourceName,isVisible) VALUES (?, ?)",[resourceName,isVisible])

    const [resourceTable] = await pool.query("SELECT * FROM resource")
    const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
    const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
    let resource = []

    const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

    resourceTable.map((resourceData)=>{

        resource = [...resource,{id: resourceData.idResource,
                                 resourceName: resourceData.resourceName,
                                 isVisible: resourceData.isVisible === 0 ? false : true,
                                 dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                    
                                            
    }]})
    res.json(resource)
}

export const postReserveHour = async (req, res) => {
    const {idResource, date, column, userName} = req.body
    let [idHour] = await pool.query("SELECT idHour FROM hour_data WHERE hourPosition = ?", [column])
    idHour = idHour[0].idHour
    await pool.query("INSERT INTO schedule_data (currentDate,userName,idResource,idHour) VALUES (?,?,?,?)",[date,userName,idResource,idHour])
    const [resourceTable] = await pool.query("SELECT * FROM resource")
    const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
    const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
    let resource = []

    const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

    resourceTable.map((resourceData)=>{

        resource = [...resource,{id: resourceData.idResource,
                                 resourceName: resourceData.resourceName,
                                 isVisible: resourceData.isVisible === 0 ? false : true,
                                 dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                    
                                            
    }]})
    res.json(resource)
}

export const putResource = async (req, res) => {
    const {isVisible} = req.body
    await pool.query("UPDATE resource SET isVisible = ? WHERE idResource = ?", [isVisible,req.params.id])
    const [resourceTable] = await pool.query("SELECT * FROM resource")
    const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
    const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
    let resource = []

    const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

    resourceTable.map((resourceData)=>{

        resource = [...resource,{id: resourceData.idResource,
                                 resourceName: resourceData.resourceName,
                                 isVisible: resourceData.isVisible === 0 ? false : true,
                                 dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                    
                                            
    }]})
    res.json(resource)
}

export const putReserveHour = async (req, res) => {
    const {userName} = req.body
    await pool.query("UPDATE schedule_data SET userName = ? WHERE idSchedule = ?", [userName,req.params.id])
    const [resourceTable] = await pool.query("SELECT * FROM resource")
    const [dateTable] = await pool.query("SELECT currentDate as date,idResource FROM `schedule_data` GROUP BY currentDate,idResource;")
    const [hourTable] = await pool.query("SELECT s.idSchedule, s.idResource,s.currentDate as date, s.userName, h.hourPosition as 'column' FROM `schedule_data` as s inner join hour_data as h on s.idHour = h.idHour;")
    let resource = []

    const newDateTable = dateTable.map((dates)=>({...dates,boxes:hourTable.filter((hour) => (hour.idResource === dates.idResource) && (hour.date === dates.date))}))

    resourceTable.map((resourceData)=>{

        resource = [...resource,{id: resourceData.idResource,
                                 resourceName: resourceData.resourceName,
                                 isVisible: resourceData.isVisible === 0 ? false : true,
                                 dates: newDateTable.filter((date) => date.idResource === resourceData.idResource)
                                    
                                            
    }]})
    res.json(resource)
}
