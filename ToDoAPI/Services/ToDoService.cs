using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Repositories;

namespace ToDoAPI.Services
{
    public class ToDoService
    {
        private readonly ToDoRepository _toDoRepository = new();
        
        private async Task<int> FindFreeIndex()
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

        public async Task<string> AddDefaultToDoTaskService()
        {
            try
            {
                await _toDoRepository.AddDefaultToDoTaskRepository(await FindFreeIndex());
                return "Added!";
            }
            catch (Exception ex) 
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "Failed :(";
            }
        }

        public async Task<string> AddNewToDoListItemService(ToDoListItem? item)
        {
            try
            {
                await _toDoRepository.AddNewToDoListItemRepository(item);
                return "ok";
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "not ok";
            }
        }

        public async Task<string> UpdateToDoListItemService(int? id, ToDoListItem? item)
        {
            try
            {
                await _toDoRepository.UpdateToDoListItemRepository(id, item);
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

        public async Task<List<ToDoListItem>> GetToDoListItemAllService()
        {
            try
            {
                var item = await _toDoRepository.GetToDoListItemAllRepository();
                return item;
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
