using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Repositories;

namespace ToDoAPI.Services
{
    public class ToDoService
    {
        private readonly ToDoRepository _toDoRepository;

        public ToDoService(ToDoRepository toDoRepository) {
            _toDoRepository = toDoRepository;
        }
        
        //finds first available index util (starting from 0), ensures not repeating indexes
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

        //initial create xml service
        public async Task<string?> GenerateXmlFilesService()
        {
            try
            {
                var repoResponse = await _toDoRepository.GenerateXmlFilesRepository();
                return repoResponse;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //CREATE one service
        public async Task<string?> AddNewToDoListItemService(ToDoListItem? item)
        {
            try
            {
                if (item == null) return null;
                await _toDoRepository.AddNewToDoListItemRepository(await FindFreeIndexUtil(), item);
                return $"{item.Title} added!";
            }
            catch (Exception)
            {
                return null;
            }
        }

        //READ one service
        public async Task<ToDoListItem?> GetToDoListItemAtIdService(int? id)
        {
            try
            {
                if (id == null) return null;
                var item = await _toDoRepository.GetToDoListItemAtIdRepository(id.Value);
                return item;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //UPDATE one service
        public async Task<string?> UpdateToDoListItemService(int? id, ToDoListItem? item)
        {
            try
            {
                if (item == null) return null;
                if (id == null || id != item.Id) return null;
                await _toDoRepository.UpdateToDoListItemRepository(item);
                return $"{item.Title} updated!";
            }
            catch (Exception)
            {
                return null;
            }
        }

        //DELETE one service
        public async Task<string?> DeleteToDoListItemService(int? id)
        {
            try
            {
                if (id == null) return null;
                await _toDoRepository.DeleteToDoListItemRepository(id.Value);
                return $"Task deleted!";
            }
            catch (Exception)
            {
                return null;
            }
        }

        //READ ALL service
        public async Task<ToDoListItemWrapper?> GetToDoListItemAllService()
        {
            try
            {
                var items = await _toDoRepository.GetToDoListItemAllRepository();
                var wrapper = new ToDoListItemWrapper { Items = items };
                return wrapper;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
