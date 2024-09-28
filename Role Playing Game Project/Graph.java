

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Stack;

class Node {
	String value;
	boolean visited = false;
	boolean traversed = false;
	boolean end = false;
	boolean root = false;
	boolean explicitLearn = false;
	boolean cycle = false;

	Node(String value, boolean visited) {
		this.value = value;
		this.visited = visited;
	}

}

public class Graph {
	boolean visited = false;
	ArrayList<Node> column = new ArrayList<>();
	ArrayList<ArrayList<Node>> adj_list = new ArrayList<>();
	ArrayList<Node> depthFirstTraversalList = new ArrayList<>();
	Stack<Node> cycleStack = new Stack<>();
	int cycleSize = 0;

	// Constructor
	public Graph() {

	}

	public void addNode(String Node) {
		if (!existInColumn(Node)) {
			Node n = new Node(Node, visited);
			column.add(n);
			adj_list.add(new ArrayList<>());
		}
	}

	public void addEdges(String source, String destination) {
		// Check if Source exist
		if (!existInColumn(source)) {
			addNode(source);
		}
//	    Check if destination exist
		if (!existInColumn(destination)) {
			addNode(destination);
		}
		// Add destination node to the adjacency list of the source node
		adj_list.get(getNodeIndex(source)).add(getNode(destination));
	}

	public boolean existInColumn(String destination) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(destination)) {
				return true;
			}
		}
		return false;
	}

	public int getNodeIndex(String destination) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(destination)) {
				return i;
			}
		}
		return -1;
	}

	public Node getNode(String source) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(source)) {
				return column.get(i);
			}
		}
		return null;
	}

	public void setVisited(String source, boolean status) {
		ArrayList<ArrayList<Node>> temp = makeA2dArr();
		for (int i = 0; i < temp.size(); i++) {
			for (int j = 0; j < temp.get(i).size(); j++) {
				if (temp.get(i).get(j).value.equals(source)) {
					temp.get(i).get(j).visited = true;
				}
			}
		}
	}

	public void setExplicitlyLearnt(String source, boolean status) {
		ArrayList<ArrayList<Node>> temp = makeA2dArr();
		for (int i = 0; i < temp.size(); i++) {
			for (int j = 0; j < temp.get(i).size(); j++) {
				if (temp.get(i).get(j).value.equals(source)) {
					temp.get(i).get(j).explicitLearn = true;
				}
			}
		}
	}

	public void printGraph() {
		for (int i = 0; i < adj_list.size(); i++) {
			System.out.print(column.get(i).value + " " + column.get(i).end + " -> ");
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				System.out.print(adj_list.get(i).get(j).value + " " + adj_list.get(i).get(j).end + " -> ");
			}
			System.out.println();
		}
	}

	public ArrayList<ArrayList<Node>> makeA2dArr() {
		ArrayList<ArrayList<Node>> Arr = new ArrayList<>();
		for (int i = 0; i < column.size(); i++) {
			ArrayList<Node> temp = new ArrayList<>();
			temp.add(column.get(i));
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				temp.add(adj_list.get(i).get(j));
			}
			Arr.add(temp);
		}
		return Arr;
	}

	public ArrayList<Node> getPreReq(String source) {
		ArrayList<ArrayList<Node>> Arr = makeA2dArr();
		for (int i = 0; i < Arr.size(); i++) {
			for (int j = 0; j < Arr.get(i).size(); j++) {
				if (source.equals(Arr.get(i).get(0).value)) {
					ArrayList<Node> withoutSource = Arr.get(i);
					// Remove the source it self, just return the PreReq
					withoutSource.remove(0);
					return withoutSource;
				}
			}
		}
		return null;
	}

	public void dfs(String source) {
		// reset traversal
		for (Node n : column) {
			n.traversed = false;
		}
		// clear list
		depthFirstTraversalList.clear();
		dfsHelper(source);
	}

	public void dfsHelper(String source) {
		if (getNode(source) == null || getNode(source).traversed) {
			return;
		}
		// Visit the node
		depthFirstTraversalList.add(getNode(source));
		getNode(source).traversed = true;
		// Recursively visit all unvisited neighbors
		for (Node neighbor : getPreReq(source)) {
			if (!neighbor.traversed) {
				dfsHelper(neighbor.value);
			}
		}
	}

	public boolean hasCycle(String source) {
		// reset traversal
		for (Node n : column) {
			n.traversed = false;
		}
		// clear stack
		cycleStack.clear();

		// clear size
		cycleSize = 0;
		System.out.println();
		return hasCycleHelper(source);
	}

	public boolean hasCycleHelper(String source) {
		// mark as visited
		getNode(source).traversed = true;
		// Increase size
		cycleSize++;

		// mark as cycled through
		getNode(source).cycle = true;
		// push in stack
		cycleStack.push(getNode(source));

		while (!cycleStack.isEmpty()) {
			// Get top Node
			Node top = cycleStack.get(cycleStack.size() - 1);

			// Iterate throgh the neigbors
			Iterator<Node> itr = getPreReq(top.value).iterator();
			while (itr.hasNext()) {
				Node neighbor = itr.next();
				if (neighbor.traversed && cycleStack.contains(neighbor)) {
					if (!neighbor.cycle)
						cycleSize++;

					// mark as cycled through
//					System.out.println(neighbor.value +  "            " +cycleSize);
					neighbor.cycle = true;
					return true;
				}
				if (!neighbor.traversed) {
					// add to size check
					if (!neighbor.cycle) {
						cycleSize++;
					}
					// Add to the stack
					cycleStack.push(neighbor);
					// mark as traversed through
					neighbor.traversed = true;
					// mark as cycled through
					neighbor.cycle = true;
//					System.out.println(neighbor.value +  "            " +cycleSize);
					// Add neighbor to the queue
					itr = getPreReq(neighbor.value).iterator();
				}
			}
			cycleSize--;
			getNode(source).cycle = false;
			cycleStack.pop();
		}
		return false;
	}

//	public void getCycle(String source) {
//		ArrayList<ArrayList<Node>> Arr = makeA2dArr();
//		// Find the spell line with the spell
//		for (int i = 0; i < Arr.size(); i++) {
//			for (int j = 0; j < Arr.get(i).size(); j++) {
//				if (source.equals(Arr.get(i).get(0).value)) {
////					if there is a prereq, return true, else return false
//					if (Arr.get(i).get(j).cycle) {
//						System.out.println(Arr.get(i).get(j).value);
//					}
//				}
//			}
//		}
//	}

//	public int countCycle(String source) {
//		// reset traversal
//		if (hasCycle(source))
//			for (Node n : column) {
//				n.traversed = false;
//			}
//		cycleStack.clear();
//		// clear list
//		System.out.println();
//		return countCycleHelper(source);
//	}

	public int countCycleHelper(String source) {
		// mark as visited
		int ans = 0;
		getNode(source).traversed = true;
		getNode(source).cycle = true;
		// push in stack
		cycleStack.push(getNode(source));
		System.out.println(source);
		ans += 1;
		while (!cycleStack.isEmpty()) {
			Node top = cycleStack.get(cycleStack.size() - 1);
			Iterator<Node> itr = getPreReq(top.value).iterator();
			while (itr.hasNext()) {
				Node neighbor = itr.next();
				if (neighbor.traversed && cycleStack.contains(neighbor)) {
					ans += 1;
//					neighbor.cycle = true;
					return ans;
				}
				if (!neighbor.traversed) {
					// add to size check
					cycleStack.push(neighbor);
					System.out.println(neighbor.value);
					ans++;
					neighbor.traversed = true;
//					neighbor.cycle = true;
					itr = getPreReq(neighbor.value).iterator();
				}
			}
			ans--;
			cycleStack.pop();
		}
		return 0;
	}

	public boolean PreReqExist(String source) {
		ArrayList<ArrayList<Node>> Arr = makeA2dArr();
		// Find the spell line with the spell
		for (int i = 0; i < Arr.size(); i++) {
			for (int j = 0; j < Arr.get(i).size(); j++) {
				if (source.equals(Arr.get(i).get(0).value)) {
//					if there is a prereq, return true, else return false
					if (Arr.get(i).size() > 1) {
						return true;
					}
					return false;
				}
			}
		}
		return false;
	}

}
