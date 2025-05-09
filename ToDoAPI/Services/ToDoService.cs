using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Repositories;

namespace ToDoAPI.Services
{
    public class ToDoService
    {
        private readonly ToDoRepository _toDoRepository = new();
        
        //finds first available index
        private async Task<int> FindFreeIndexUtil()
        {
            var list = await _toDoRepository.GetToDoListItemAllRepository();
            int sendIndex = 0;
            var indexes = new List<int>();
            foreach (var item in list)
            {
                indexes.Add(item.Id);
            }
            while(indexes.Contains(sendIndex)) sendIndex++;

            return sendIndex;
        }

        //initial create xml
        public async Task<string> GenerateXmlFilesService()
        {
            try
            {
                var repoResponse = await _toDoRepository.GenerateXmlFilesRepository();
                return repoResponse;
            }
            catch (Exception ex) 
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "Something went wrong :(";
            }
        }

        public async Task<string> AddNewToDoListItemService(ToDoListItem? item)
        {
            try
            {
                await _toDoRepository.AddNewToDoListItemRepository(await FindFreeIndexUtil(), item);
                return "ok";
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "not ok";
            }
        }

        public async Task<string> UpdateToDoListItemService(ToDoListItem? item)
        {
            try
            {
                await _toDoRepository.UpdateToDoListItemRepository(item);
                return "ok";
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "not ok";
            }
        }

        public async Task<ToDoListItem?> GetToDoListItemAtIdService(int? id)
        {
            try
            {
                var item = await _toDoRepository.GetToDoListItemAtIdRepository(id);
                return item;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<ToDoListItemWrapper?> GetToDoListItemAllService()
        {
            try
            {
                var items = await _toDoRepository.GetToDoListItemAllRepository();
                var wrapper = new ToDoListItemWrapper { Items = items };
                return wrapper;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<string> DeleteToDoListItemService(int? id)
        {
            try
            {
                await _toDoRepository.DeleteToDoListItemRepository(id);
                return "Went ok!";
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "not gud";
            }
        }

    }
}
