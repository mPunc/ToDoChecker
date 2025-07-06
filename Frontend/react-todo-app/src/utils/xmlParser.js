export async function parseXmlToTasks(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  
  const items = [...xmlDoc.getElementsByTagName('ToDoListItem')];
  
  return items.map(item => {
    const getText = (tag) => {
      const el = item.getElementsByTagName(tag)[0];
      return el ? el.textContent : '';
    };

    return {
      id: getText('Id'),
      title: getText('Title'),
      mainText: getText('MainText'),
      notes: getText('Notes'),
      createdAt: getText('CreatedAt'),
      dueDate: getText('DueDate'),
      priority: getText('Priority'),
      completed: item.getAttribute('completed'),
      category: item.getAttribute('category'),
    };
  });
}

export async function buildTaskXml(task) {
    return `
        <ToDoListItem completed="${task.completed}" category="${task.category}">
        <Id>${task.id}</Id>
        <Title>${task.title}</Title>
        <TextContent>
            <MainText>${task.mainText}</MainText>
            <Notes>${task.notes}</Notes>
        </TextContent>
        <CreatedAt>${task.createdAt}</CreatedAt>
        <DueDate>${task.dueDate}</DueDate>
        <Priority>${task.priority}</Priority>
        </ToDoListItem>
    `;
}
